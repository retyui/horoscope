import { all, call } from 'redux-saga/effects';

import { createSagaErrorBoundary } from '@/features/errorTracking';

import storages from '../storages';
import { AbstractStorage } from '../types';

const safeCleanAll = createSagaErrorBoundary(function* safeCleanAll(
  storage: AbstractStorage<any>,
) {
  yield call([storage, storage.cleanAll]);
});

export function* watchOnDeauthorize() {
  const effects = storages.map((storage) => call(safeCleanAll, storage));

  yield all(effects);
}
