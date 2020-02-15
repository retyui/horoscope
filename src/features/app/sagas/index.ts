import { call, spawn, takeEvery } from 'redux-saga/effects';

import { setMainRoot } from '@/features/app/navigation';
import {
  AUTHORIZE_FAILURE,
  AUTHORIZE_SUCCESS,
  DEAUTHORIZE,
  ORGANIZATION_PASSWORD_CONFIRM_SUCCESS,
} from '@/features/auth/actionTypes';
import { createSagaErrorBoundary } from '@/features/errorTracking';

import { redirectToSignIn } from './auth';
import { appLaunch } from './init';
import { safeRedirect } from './navigator';

function* redirectToHome() {
  yield call(safeRedirect, setMainRoot);
}

function* rootApplicationSaga() {
  yield spawn(appLaunch);
  yield takeEvery(
    [AUTHORIZE_FAILURE, DEAUTHORIZE],
    createSagaErrorBoundary(redirectToSignIn),
  );
  yield takeEvery(
    [AUTHORIZE_SUCCESS, ORGANIZATION_PASSWORD_CONFIRM_SUCCESS],
    createSagaErrorBoundary(redirectToHome),
  );
}

export default rootApplicationSaga;
