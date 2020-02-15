import { AxiosError } from 'axios';
import { applySpec, defaultTo, endsWith, path, pathEq, pipe } from 'ramda';

import { REQUEST_CONFIG_RETRY_KEY } from '../consts';
import { AuthTokens, OptionalAuthTokens, RefreshResponse } from '../types';
import { REFRESH_END_POINT, SIGN_OUT_END_POINT } from './endpoints';

const getAxiosErrorUrl = pipe(
  path<string>(['config', 'url']),
  defaultTo(''),
);

export const isFailedRefreshTokensRequest: (
  error: AxiosError<any>,
) => boolean = pipe(getAxiosErrorUrl, endsWith(REFRESH_END_POINT));

export const isFailedSignOutRequest: (error: AxiosError<any>) => boolean = pipe(
  getAxiosErrorUrl,
  endsWith(SIGN_OUT_END_POINT),
);

export const isRetryRequest = pathEq(
  ['error', 'config', REQUEST_CONFIG_RETRY_KEY],
  true,
);

export const extractAuthTokens = applySpec<AuthTokens>({
  accessToken: path(['data', 'attributes', 'access_token']),
  refreshToken: path(['data', 'attributes', 'refresh_token']),
});

export const extractOptionalAuthTokens = (
  response: RefreshResponse,
): OptionalAuthTokens => {
  const { refresh_token, access_token } = response.data.attributes;

  return { accessToken: access_token, refreshToken: refresh_token };
};
