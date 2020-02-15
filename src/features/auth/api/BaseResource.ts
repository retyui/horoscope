import { applySpec, path } from 'ramda';

import JsonApiResource from '@/api/JsonApiResource';

import {
  AuthTokens,
  ConfirmOrganizationPasswordRequest,
  ConfirmOrganizationPasswordResponse,
  OptionalAuthTokens,
  RecoveryPasswordRequest,
  RecoveryPasswordResponse,
  RefreshRequest,
  RefreshResponse,
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
  VerifyParamsRequest,
  VerifyParamsResponse,
} from '../types';
import { extractAuthTokens, extractOptionalAuthTokens } from './utils';

class BaseResource extends JsonApiResource {
  confirmOrganizationPassword(password: string) {
    return this.doPost<
      ConfirmOrganizationPasswordRequest,
      ConfirmOrganizationPasswordResponse
    >('/auth/confirm_application_password', {
      password,
    });
  }

  refreshTokens(refreshToken: string): Promise<OptionalAuthTokens> {
    return this.doPost<RefreshRequest, RefreshResponse>('/auth/refresh', {
      refresh_token: refreshToken,
    }).then(extractOptionalAuthTokens);
  }

  authenticate(data: SignInRequest): Promise<AuthTokens> {
    return this.doPost<SignInRequest, SignInResponse>(
      '/auth/sign_in',
      data,
    ).then(extractAuthTokens);
  }

  logOut() {
    return this.doDelete<void>('/auth/sign_out');
  }

  verifyParams(data: VerifyParamsRequest) {
    return this.doPost<VerifyParamsRequest, VerifyParamsResponse>(
      '/auth/verify_params',
      data,
    );
  }

  signUpVerifyEmail(email: string) {
    return this.verifyParams({ email });
  }

  signUpVerifyPhone(phone: string) {
    return this.verifyParams({ phone });
  }

  signUp(data: SignUpRequest): Promise<AuthTokens> {
    return this.doPost<SignUpRequest, SignUpResponse>(
      '/auth/sign_up',
      data,
    ).then(extractAuthTokens);
  }

  recoveryPassword(email: string) {
    return this.doPost<RecoveryPasswordRequest, RecoveryPasswordResponse>(
      '/reset_passwords',
      { email },
    ).then(
      applySpec({
        token: path(['data', 'attributes', 'token']),
      }),
    );
  }

  confirmCode({ code, token }: { code: string; token: string }) {
    return this.doPatch(`/reset_passwords/${token}`, { token: code });
  }

  updatePassword({
    code,
    token,
    password,
  }: {
    code: string;
    token: string;
    password: string;
  }) {
    return this.doPatch<{}, {}>(`/reset_passwords/${token}`, {
      token: code,
      password,
    });
  }
}

export default BaseResource;
