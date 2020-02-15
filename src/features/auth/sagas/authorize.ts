import { all, call, put, takeEvery } from 'redux-saga/effects';

import { getCurrentUser } from '@/features/currentUser/sagas';
import { createSagaErrorBoundary } from '@/features/errorTracking';

import { authorizeFailure, authorizeSuccess } from '../actions';
import { AUTHORIZE, AUTHORIZE_FAILURE, DEAUTHORIZE } from '../actionTypes';
import api from '../api';
import { flushTokens as flushTokensAsync, getTokens } from '../tokensStorage';
import TokenNotDefinedError from '../utils/TokenNotDefinedError';

export function* authorize() {
  try {
    const tokens: $AsyncReturnType<typeof getTokens> = yield call(getTokens);

    if (!tokens) {
      throw new TokenNotDefinedError();
    }

    yield call([api, api.setTokens], tokens);
    yield call(getCurrentUser);

    yield put(authorizeSuccess());
  } catch (error) {
    yield put(authorizeFailure(error));
  }
}

export function* flushTokens() {
  yield call(flushTokensAsync);
}

export function* deauthorize() {
  yield all([call([api, api.logOut]), call(flushTokens)]);
}

/* istanbul ignore next */
function* authorizeSaga() {
  yield takeEvery(AUTHORIZE, authorize);
  yield takeEvery(AUTHORIZE_FAILURE, createSagaErrorBoundary(flushTokens));
  yield takeEvery(DEAUTHORIZE, createSagaErrorBoundary(deauthorize));
}

export default authorizeSaga;
