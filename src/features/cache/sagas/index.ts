import { spawn, takeEvery } from 'redux-saga/effects';

import { INDEX_RESOURCES } from '@/ducks/dao/actionTypes';
import { DEAUTHORIZE } from '@/features/auth/actionTypes';
import { createSagaErrorBoundary } from '@/features/errorTracking';

import { cleanExpiredStorageCache } from './cleanExpiredStorageCache';
import { watchOnDeauthorize } from './deauthorize';
import { watchOnIndexResources } from './indexResources';

export default function* cacheSaga() {
  yield takeEvery(
    INDEX_RESOURCES,
    createSagaErrorBoundary(watchOnIndexResources),
  );
  yield takeEvery(DEAUTHORIZE, createSagaErrorBoundary(watchOnDeauthorize));

  yield spawn(cleanExpiredStorageCache);
}
