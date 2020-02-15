import { call, select, spawn, takeEvery } from 'redux-saga/effects';

import { setMainRoot } from '@/features/app/navigation';
import {
  AUTHORIZE_FAILURE,
  AUTHORIZE_SUCCESS,
  DEAUTHORIZE,
  ORGANIZATION_PASSWORD_CONFIRM_SUCCESS,
} from '@/features/auth/actionTypes';
import { setOrganizationPasswordRoot } from '@/features/auth/navigation';
import { isInactiveUser } from '@/features/currentUser/selectors';
import { createSagaErrorBoundary } from '@/features/errorTracking';

import { redirectToSignIn } from './auth';
import { waitCurrentCompanyData } from './criticalData';
import { appLaunch } from './init';
import { safeRedirect } from './navigator';

function* redirectToOrganizationPassword() {
  yield call(waitCurrentCompanyData);
  yield call(safeRedirect, setOrganizationPasswordRoot);
}

function* redirectToHome() {
  const isInactive = yield select(isInactiveUser);

  if (isInactive) {
    return yield call(redirectToOrganizationPassword);
  }

  return yield call(safeRedirect, setMainRoot);
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
