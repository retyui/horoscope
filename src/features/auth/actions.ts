import { createAction } from 'redux-actions';

import {
  AUTHENTICATE,
  AUTHENTICATE_FAILURE,
  AUTHENTICATE_SUCCESS,
  AUTHORIZE,
  AUTHORIZE_FAILURE,
  AUTHORIZE_SUCCESS,
  DEAUTHORIZE,
  ORGANIZATION_PASSWORD_CONFIRM_SUCCESS,
} from './actionTypes';
import { AuthTokens, SignInRequest } from './types';

export const authenticate = createAction<SignInRequest>(AUTHENTICATE);
export const authenticateSuccess = createAction<AuthTokens>(
  AUTHENTICATE_SUCCESS,
);
export const authenticateFailure = createAction<Error>(AUTHENTICATE_FAILURE);

export const authorize = createAction<void>(AUTHORIZE);
export const authorizeSuccess = createAction<void>(AUTHORIZE_SUCCESS);
export const authorizeFailure = createAction<Error>(AUTHORIZE_FAILURE);

export const organizationPasswordConfirmSuccess = createAction<void>(
  ORGANIZATION_PASSWORD_CONFIRM_SUCCESS,
);

export const deauthorize = createAction<void>(DEAUTHORIZE);

export type AuthenticateActionType = ReturnType<typeof authenticate>;
export type AuthenticateFailureActionType = ReturnType<
  typeof authenticateFailure
>;
export type AuthenticateSuccessActionType = ReturnType<
  typeof authenticateSuccess
>;

export type AuthorizeActionType = ReturnType<typeof authorize>;
export type AuthorizeFailureActionType = ReturnType<typeof authorizeFailure>;
export type AuthorizeSuccessActionType = ReturnType<typeof authorizeSuccess>;

export type DeauthorizeActionType = ReturnType<typeof deauthorize>;
