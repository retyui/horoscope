import { call, put } from 'redux-saga/effects';

import {
  authenticate as authenticateAction,
  authenticateFailure,
  authenticateSuccess,
  authorize as authorizeAction,
} from '../actions';
import api from '../api';
import { storeTokens } from '../tokensStorage';
import { authenticate, onAuthenticateSuccess } from './authenticate';

describe('onAuthenticateSuccess', () => {
  const response = {
    accessToken: 'string',
    refreshToken: 'string',
  };
  const action = authenticateSuccess(response);

  it('should set tokens with peristance if registered', () => {
    const it = onAuthenticateSuccess(action);

    expect(it.next().value).toEqual(call(storeTokens, response));
  });

  it('then should dispatch authorize action', () => {
    const it = onAuthenticateSuccess(action);

    it.next();

    expect(it.next().value).toEqual(put(authorizeAction()));
  });
});

describe('authenticate', () => {
  const response = {
    accessToken: 'string',
    refreshToken: 'string',
  };

  const data = {
    email: 'string',
    password: 'string',
  };
  const action = authenticateAction(data);

  it('should call authenticate API method', () => {
    const it = authenticate(action);

    expect(it.next().value).toEqual(call([api, api.authenticate], data));
  });

  it('then should dispatch authenticateSuccess if succeed', () => {
    const it = authenticate(action);

    it.next();

    expect(it.next(response).value).toEqual(put(authenticateSuccess(response)));
  });

  it('then should dispatch authenticateFailure if failed', () => {
    const it = authenticate(action);
    const error = new Error('error');

    it.next();

    expect(it.throw(error).value).toEqual(put(authenticateFailure(error)));
  });
});
