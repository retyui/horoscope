import { AxiosError, AxiosRequestConfig } from 'axios';
import { assocPath } from 'ramda';

import { isSessionExpirationError } from '@/api/errors';
import { AbstractGateway } from '@/api/types';

import { REQUEST_CONFIG_RETRY_KEY } from '../consts';
import { AuthTokens, SignInRequest, Token } from '../types';
import BaseResource from './BaseResource';
import {
  isFailedRefreshTokensRequest,
  isFailedSignOutRequest,
  isRetryRequest,
} from './utils';

type OnTokensUpdateFn = (tokens: AuthTokens) => void;

type Options = {
  onTokensUpdate: OnTokensUpdateFn;
};

class AuthResource extends BaseResource {
  accessToken: Token | null;
  refreshToken: Token | null;
  refreshRequest: Promise<any> | null;
  emitOnUpdate: OnTokensUpdateFn;
  emitUnAuthorized: (() => void) | null;

  constructor({ onTokensUpdate }: Options) {
    super();

    this.emitOnUpdate = onTokensUpdate;
    this.accessToken = null;
    this.refreshToken = null;
    this.refreshRequest = null;
    this.emitUnAuthorized = null;
  }

  onUnAuthorized(fn: () => void) {
    this.emitUnAuthorized = fn;

    return () => {
      this.emitUnAuthorized = null;
    };
  }

  setTokens({ accessToken, refreshToken }: AuthTokens) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }

  setTokensAndEmitEvent(tokens: AuthTokens) {
    this.setTokens(tokens);
    this.emitOnUpdate(tokens);
  }

  clearTokens() {
    this.accessToken = null;
    this.refreshToken = null;
  }

  async refreshTokens(currentRefreshToken: string) {
    const tokens = await super.refreshTokens(currentRefreshToken);
    const { accessToken, refreshToken } = tokens;

    this.setTokensAndEmitEvent({
      accessToken,
      refreshToken: refreshToken || currentRefreshToken,
    });

    return tokens;
  }

  async authenticate(data: SignInRequest) {
    const tokens = await super.authenticate(data);

    this.setTokens(tokens);

    return tokens;
  }

  logOut() {
    return super
      .logOut()
      .catch(
        // ignore all error
        () => {},
      )
      .finally(() => {
        this.clearTokens();
      });
  }

  injectAuthorizationHeader = (requestConfig: AxiosRequestConfig) => {
    if (!this.accessToken) {
      return requestConfig;
    }

    const newRequestConfig = assocPath(
      ['headers', 'Authorization'],
      `Bearer ${this.accessToken}`,
      requestConfig,
    );

    return newRequestConfig;
  };

  refreshTokenIfCan = async (error: AxiosError<any>) => {
    if (
      !this.refreshToken ||
      !isSessionExpirationError(error) ||
      isFailedSignOutRequest(error) ||
      isRetryRequest(error)
    ) {
      throw error;
    }

    if (isFailedRefreshTokensRequest(error)) {
      if (this.emitUnAuthorized) {
        this.emitUnAuthorized();
      }

      throw error;
    }

    if (!this.refreshRequest) {
      this.refreshRequest = this.refreshTokens(this.refreshToken).finally(
        () => {
          this.refreshRequest = null;
        },
      );
    }

    await this.refreshRequest;

    const newRequestConfig: AxiosRequestConfig = {
      ...error.config,
      // @ts-ignore
      [REQUEST_CONFIG_RETRY_KEY]: true,
    };

    return this.apiGateway.retryRequest(newRequestConfig);
  };

  applyRequestInterceptor() {
    const {
      injectAuthorizationHeader: onFulfilled,
      refreshTokenIfCan: onRejected,
    } = this;

    this.apiGateway.useInterceptor({ stage: 'request', onFulfilled });
    this.apiGateway.useInterceptor({ stage: 'response', onRejected });
  }

  setApiGateway(apiGateway: AbstractGateway) {
    super.setApiGateway(apiGateway);

    this.applyRequestInterceptor();
  }
}

export default AuthResource;
