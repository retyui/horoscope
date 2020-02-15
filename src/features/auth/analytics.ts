import { call, select, takeEvery } from 'redux-saga/effects';

import { resetUser, setUser } from '@/features/analytics';
import {
  getCurrentUserEmailAddress,
  getCurrentUserId,
} from '@/features/currentUser/selectors';

import { AUTHORIZE_SUCCESS, DEAUTHORIZE } from './actionTypes';

function* onAuthorizeSuccess() {
  const id = yield select(getCurrentUserId);
  const email = yield select(getCurrentUserEmailAddress);

  yield call(setUser, {
    id,
    email,
    lastLogin: new Date(),
  });
}

function* onDeAuthorize() {
  yield call(resetUser);
}

export default function* authTracker() {
  yield takeEvery(AUTHORIZE_SUCCESS, onAuthorizeSuccess);
  yield takeEvery(DEAUTHORIZE, onDeAuthorize);
}
