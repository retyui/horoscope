import { call, put, spawn, take } from 'redux-saga/effects';

import { deauthorize } from '../actions';
import authenticateSaga from './authenticate';
import authorizeSaga from './authorize';
import { createAuthErrorChannel } from './channels';

export function* watchOnApiRequestError() {
  const channel = yield call(createAuthErrorChannel);

  try {
    while (true) {
      yield take(channel);
      yield put(deauthorize());
    }
  } finally {
    channel.close();
  }
}

function* authSaga() {
  yield spawn(watchOnApiRequestError);
  yield spawn(authenticateSaga);
  yield spawn(authorizeSaga);
}

export default authSaga;
