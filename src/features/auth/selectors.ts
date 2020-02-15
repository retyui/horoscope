import { pipe, prop } from 'ramda';

import { REDUX_AUTH_PROP_KEY } from './consts';
import { AuthState, PartialState } from './reducer';

const getRoot = (state: PartialState): AuthState => state[REDUX_AUTH_PROP_KEY];

export const getAuthenticationError = pipe<
  PartialState,
  AuthState,
  Error | null
>(getRoot, prop('authenticationError'));

export const getAuthorizationError = pipe<
  PartialState,
  AuthState,
  Error | null
>(getRoot, prop('authorizationError'));

export const isAuthenticating = pipe<PartialState, AuthState, boolean>(
  getRoot,
  prop('isAuthenticating'),
);

export const isAuthorizing = pipe<PartialState, AuthState, boolean>(
  getRoot,
  prop('isAuthorizing'),
);

export const isAuthorized = pipe<PartialState, AuthState, boolean>(
  getRoot,
  prop('isAuthorized'),
);
