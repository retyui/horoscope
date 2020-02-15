import { call, select, takeEvery } from 'redux-saga/effects';

import { AUTHORIZE_SUCCESS, DEAUTHORIZE } from '@/features/auth/actionTypes';
import {
  getCurrentUserEmailAddress,
  getCurrentUserFirstName,
  getCurrentUserId,
} from '@/features/currentUser/selectors';

import { clearPerson, createSagaErrorBoundary, setPerson } from '../index';

export function* onAuthorizeSuccess() {
  const id = yield select(getCurrentUserId);
  const email = yield select(getCurrentUserEmailAddress);
  const name = yield select(getCurrentUserFirstName);

  yield call(setPerson, { id, name, email });
}

export function* onDeauthorize() {
  yield call(clearPerson);
}

/* istanbul ignore next */
export default function* rootErrorTrackingSaga() {
  yield takeEvery(
    AUTHORIZE_SUCCESS,
    createSagaErrorBoundary(onAuthorizeSuccess),
  );
  yield takeEvery(DEAUTHORIZE, createSagaErrorBoundary(onDeauthorize));
}
