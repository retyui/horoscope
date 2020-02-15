import {
  authenticate,
  authenticateFailure,
  authorize,
  authorizeFailure,
  authorizeSuccess,
} from './actions';
import { REDUX_AUTH_PROP_KEY } from './consts';
import authReducer from './reducer';
import TokenNotDefinedError from './utils/TokenNotDefinedError';

const reducer = authReducer[REDUX_AUTH_PROP_KEY];

test('should set isAuthorizing flag on AUTHORIZE', () => {
  const action = authorize();
  const state = reducer(
    // @ts-ignore
    { isAuthorizing: false },
    action,
  );

  expect(state.isAuthorizing).toBe(true);
});

test('should clear isAuthorizing flag on AUTHORIZE_SUCCESS', () => {
  const action = authorizeSuccess();
  const state = reducer(
    // @ts-ignore
    { isAuthorizing: true },
    action,
  );

  expect(state.isAuthorizing).toBe(false);
});

test('should clear isAuthorizing flag on AUTHORIZE_FAILURE', () => {
  const action = authorizeFailure(new Error());
  const state = reducer(
    // @ts-ignore
    { isAuthorizing: true },
    action,
  );

  expect(state.isAuthorizing).toBe(false);
});

test('should clear authorizationError on AUTHORIZE', () => {
  const action = authorize();
  const state = reducer(
    // @ts-ignore
    { authorizationError: 'error' },
    action,
  );

  expect(state.authorizationError).toBe(null);
});

test('should set authorizationError on AUTHORIZE_FAILURE if not token error', () => {
  const error = new Error();
  const action = authorizeFailure(error);
  const state = reducer(
    // @ts-ignore
    { authorizationError: null },
    action,
  );

  expect(state.authorizationError).toBe(error);
});

test('should not set authorizationError on AUTHORIZE_FAILURE if token error', () => {
  const error = new TokenNotDefinedError();
  const action = authorizeFailure(error);
  const state = reducer(
    // @ts-ignore
    { authorizationError: null },
    action,
  );

  expect(state.authorizationError).toBe(null);
});

test('should set authenticationError on AUTHENTICATE_FAILURE', () => {
  const error = new Error();
  const action = authenticateFailure(error);
  const state = reducer(
    // @ts-ignore
    { authenticationError: null },
    action,
  );

  expect(state.authenticationError).toEqual(error);
});

test('should clear authenticationError on AUTHENTICATE', () => {
  const action = authenticate({ email: '', password: '' });
  const state = reducer(
    // @ts-ignore
    { authenticationError: 'error' },
    action,
  );

  expect(state.authenticationError).toEqual(null);
});
