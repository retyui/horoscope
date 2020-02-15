import { equals, lte, path, pipe } from 'ramda';

import {
  BAD_REQUEST_STATUS_CODE,
  FORBIDDEN_STATUS_CODE,
  GATEWAY_TIMEOUT_CODE,
  NETWORK_ERROR_STATUS_CODE,
  NOT_FOUND_CODE,
  SERVER_ERRORS_CODE,
  UNAUTHORIZED_STATUS_CODE,
  UNPROCESSABLE_ENTITY_CODE,
} from '../consts/errors';

export * from './jsonApi';

const getErrorCode = (error: Error): number => {
  const requestStatusCode = path(['request', 'status'], error);
  const responseStatusCode = path(['response', 'status'], error);

  // error.response.status - Can be `undefined` (it is depend on the environment Node.js, Browser or ReactNative)

  // @ts-ignore
  return requestStatusCode === undefined
    ? responseStatusCode
    : requestStatusCode;
};

export const isForbiddenError: (e: Error) => boolean = pipe(
  getErrorCode,
  equals(FORBIDDEN_STATUS_CODE),
);

export const isNotFoundError: (e: Error) => boolean = pipe(
  getErrorCode,
  equals(NOT_FOUND_CODE),
);

export const isSessionExpirationError: (e: Error) => boolean = pipe(
  getErrorCode,
  equals(UNAUTHORIZED_STATUS_CODE),
);

// Real errors (Offline or CORS ...) are hidden from us
// axios would fire a network error
export const isNetworkError: (e: Error) => boolean = pipe(
  getErrorCode,
  equals(NETWORK_ERROR_STATUS_CODE),
);

export const isTimeoutError: (e: Error) => boolean = pipe(
  getErrorCode,
  equals(GATEWAY_TIMEOUT_CODE),
);

export const isServerError: (e: Error) => boolean = pipe(
  getErrorCode,
  lte(SERVER_ERRORS_CODE),
);

export const isBadRequestError: (e: Error) => boolean = pipe(
  getErrorCode,
  equals(BAD_REQUEST_STATUS_CODE),
);

export const isUnprocessableEntityError: (e: Error) => boolean = pipe(
  getErrorCode,
  equals(UNPROCESSABLE_ENTITY_CODE),
);
