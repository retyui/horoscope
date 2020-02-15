import { call, spawn, take, takeEvery } from '@redux-saga/core/effects';

import { APP_LAUNCHED } from '@/features/navigation/actionTypes';
import { lockToPortrait } from '@/features/orientation';

import { watchAppLaunch } from './auth';
import { isNavigatorInitialized } from './navigator';

export function* appLaunch() {
  yield call(lockToPortrait);
  // Run watcher immediately (To improve application start time)
  yield spawn(watchAppLaunch);

  // And then subscribe on 'APP_LAUNCHED' when Navigator was initialized.

  // Bug on Android:
  // When press on system back button
  // An application navigator switch to Splash screen
  // And we need to redirect from Splash screen to Home\Sign In screen when application restored from background

  const initialized = yield call(isNavigatorInitialized);

  if (!initialized) {
    yield take(APP_LAUNCHED);
  }

  yield takeEvery(APP_LAUNCHED, watchAppLaunch);
}
