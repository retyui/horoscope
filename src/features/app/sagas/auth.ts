import { call, put } from 'redux-saga/effects';

import { authorize } from '@/features/auth/actions';
import { setAuthRoot } from '@/features/auth/navigation';

import { waitCurrentCompanyData } from './criticalData';
import { safeRedirect } from './navigator';

export function* watchAppLaunch() {
  yield put(authorize());
}

export function* redirectToSignIn() {
  yield call(waitCurrentCompanyData);
  yield call(safeRedirect, setAuthRoot);
}
