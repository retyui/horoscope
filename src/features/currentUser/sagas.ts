import { call, put } from 'redux-saga/effects';

import { createOfflineFallbackSaga } from '@/ducks/dao/jsonApi';
import api from '@/features/users/api';
import storage from '@/features/users/storage';
import { UserId } from '@/features/users/types';

import { updateCurrentUserId } from './actions';

export const findCurrentUser = createOfflineFallbackSaga({
  storageType: storage.getType(),
  jsonApiMethod: () => api.getCurrentUser(),
  storageMethod: () => storage.getStoredCurrentUser(),
  onGetIds: (ids: Array<UserId>) => storage.setCurrentUserIds(ids),
});

export function* getCurrentUser() {
  const [currentUserId] = yield call(findCurrentUser);

  yield put(updateCurrentUserId(currentUserId));
}
