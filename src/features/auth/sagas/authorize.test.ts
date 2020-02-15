import { all, call, put } from 'redux-saga/effects';

import { getCurrentUser } from '@/features/currentUser/sagas';

import { authorizeFailure, authorizeSuccess } from '../actions';
import api from '../api';
import { flushTokens as flushTokensAsync, getTokens } from '../tokensStorage';
import TokenNotDefinedError from '../utils/TokenNotDefinedError';
import { authorize, deauthorize, flushTokens } from './authorize';

describe('flushTokens', () => {
  it('should call method', () => {
    const it = flushTokens();

    expect(it.next().value).toEqual(call(flushTokensAsync));
  });
});

describe('deauthorize', () => {
  it('should call api logOut method and clear tokens in storage', () => {
    const it = deauthorize();

    expect(it.next().value).toEqual(
      all([call([api, api.logOut]), call(flushTokens)]),
    );
  });
});

describe('authorize', () => {
  it('should retrieve token from storage first', () => {
    const it = authorize();

    expect(it.next().value).toEqual(call(getTokens));
  });

  it('then should set tokens to API', () => {
    const tokens = { accessToken: '', refreshToken: '' };
    const it = authorize();

    it.next();

    expect(it.next(tokens).value).toEqual(call([api, api.setTokens], tokens));
  });

  test(
    'then should fetch data that required authorization and' +
      ' dispatch AUTHORIZE_SUCCESS when request finish without errors',
    () => {
      const tokens = { accessToken: '', refreshToken: '' };
      const it = authorize();

      it.next();
      it.next(tokens);

      expect(it.next().value).toEqual(call(getCurrentUser));
      expect(it.next().value).toEqual(put(authorizeSuccess()));
      expect(it.next().done).toBeTruthy();
    },
  );

  it('if token does not exist should dispatch AUTHORIZE_FAILURE', () => {
    const missingTokenError = new TokenNotDefinedError();
    const it = authorize();
    const tokens = null;

    it.next(tokens);

    expect(it.next().value).toEqual(put(authorizeFailure(missingTokenError)));
  });
});
