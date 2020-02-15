import { always, F, T } from 'ramda';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';

import { ReducersMapObjectType } from '@/types/redux';

import {
  AuthenticateFailureActionType,
  AuthorizeFailureActionType,
} from './actions';
import {
  AUTHENTICATE,
  AUTHENTICATE_FAILURE,
  AUTHENTICATE_SUCCESS,
  AUTHORIZE,
  AUTHORIZE_FAILURE,
  AUTHORIZE_SUCCESS,
  DEAUTHORIZE,
} from './actionTypes';
import { REDUX_AUTH_PROP_KEY } from './consts';
import TokenNotDefinedError from './utils/TokenNotDefinedError';

const alwaysNull = always(null);

const authorizationError = handleActions<Error | null, Error>(
  {
    [AUTHENTICATE]: alwaysNull,
    [AUTHORIZE]: alwaysNull,
    [AUTHORIZE_FAILURE]: (
      state,
      { payload: error }: AuthorizeFailureActionType,
    ) => (error instanceof TokenNotDefinedError ? state : error),
  },
  null,
);

const authenticationError = handleActions<Error | null, Error>(
  {
    [AUTHENTICATE]: alwaysNull,
    [AUTHENTICATE_FAILURE]: (
      _,
      { payload: error }: AuthenticateFailureActionType,
    ) => error,
    [AUTHORIZE_SUCCESS]: alwaysNull,
  },
  null,
);

const isAuthorized = handleActions<boolean>(
  {
    [AUTHORIZE_SUCCESS]: T,
    [DEAUTHORIZE]: F,
  },
  false,
);

const isAuthorizing = handleActions<boolean>(
  {
    [AUTHORIZE]: T,
    [AUTHORIZE_SUCCESS]: F,
    [AUTHORIZE_FAILURE]: F,
  },
  false,
);

const isAuthenticating = handleActions<boolean>(
  {
    [AUTHENTICATE]: T,
    [AUTHENTICATE_SUCCESS]: F,
    [AUTHENTICATE_FAILURE]: F,
  },
  false,
);

const authReducer = combineReducers({
  authenticationError,
  authorizationError,
  isAuthenticating,
  isAuthorized,
  isAuthorizing,
});

const partialState = {
  [REDUX_AUTH_PROP_KEY]: authReducer,
};

export default partialState;

export type AuthState = ReturnType<typeof authReducer>;

export type PartialState = ReducersMapObjectType<typeof partialState>;
