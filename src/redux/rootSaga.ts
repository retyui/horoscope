import { delay, spawn } from 'redux-saga/effects';

import appSaga from '@/features/app/sagas';
import authSaga from '@/features/auth/sagas';
import cacheSaga from '@/features/cache/sagas';
import errorTrackingSaga from '@/features/errorTracking/sagas';

function* rootSaga() {
  // This delay need to wait of extracting stored locally environment variables for non production environment
  // More here src/features/environment/initDynmicEnv.ts
  if (process.env.BUILD_ENV !== 'production') {
    yield delay(1);
  }

  yield spawn(authSaga);
  yield spawn(appSaga);
  yield spawn(cacheSaga);
  yield spawn(errorTrackingSaga);
}

export default rootSaga;
