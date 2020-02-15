import { call, take } from 'redux-saga/effects';

import { APP_LAUNCHED } from '@/features/navigation/actionTypes';
import { getNavigatorInstance } from '@/features/navigation/instance';

export function* isNavigatorInitialized() {
  const instance = yield call(getNavigatorInstance);

  return Boolean(instance);
}

export function* waitNavigatorInit() {
  const initialized = yield call(isNavigatorInitialized);

  if (!initialized) {
    yield take(APP_LAUNCHED);
  }
}

export function* safeRedirect(redirectFn: () => void) {
  yield call(waitNavigatorInit);
  yield call(redirectFn);
}
