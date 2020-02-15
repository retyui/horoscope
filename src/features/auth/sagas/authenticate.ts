import { call, put, takeEvery, takeLeading } from 'redux-saga/effects';

import { createSagaErrorBoundary } from '@/features/errorTracking';

import {
  AuthenticateActionType,
  authenticateFailure,
  authenticateSuccess,
  AuthenticateSuccessActionType,
  authorize as authorizeAction,
} from '../actions';
import { AUTHENTICATE, AUTHENTICATE_SUCCESS } from '../actionTypes';
import api from '../api';
import { storeTokens } from '../tokensStorage';

export function* authenticate({ payload: data }: AuthenticateActionType) {
  try {
    const tokens: $AsyncReturnType<typeof api.authenticate> = yield call(
      [api, api.authenticate],
      data,
    );

    yield put(authenticateSuccess(tokens));
  } catch (error) {
    yield put(authenticateFailure(error));
  }
}

export function* onAuthenticateSuccess({
  payload: tokens,
}: AuthenticateSuccessActionType) {
  yield call(storeTokens, tokens);
  yield put(authorizeAction());
}

/* istanbul ignore next */
function* authenticateSaga() {
  yield takeLeading(AUTHENTICATE, authenticate);
  yield takeEvery(
    AUTHENTICATE_SUCCESS,
    createSagaErrorBoundary(onAuthenticateSuccess),
  );
}

export default authenticateSaga;
