import { all, call, delay, spawn } from 'redux-saga/effects';

import storages from '../storages';

const INITIAL_DELAY_BEFORE_RUN_CLEAN_TASK_MS = 10000;
const CACHE_LIFETIME_DAYS = 7;

export function* clean() {
  const effects = storages.map((storage) =>
    spawn([storage, storage.cleanUp], { days: CACHE_LIFETIME_DAYS }),
  );

  yield all(effects);
}

export function* cleanExpiredStorageCache() {
  yield delay(INITIAL_DELAY_BEFORE_RUN_CLEAN_TASK_MS);
  yield call(clean);
}
