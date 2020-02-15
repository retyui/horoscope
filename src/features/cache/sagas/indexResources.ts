import { all, call } from 'redux-saga/effects';

import { IndexResourcesActionType } from '@/ducks/dao/actions';
import { createSagaErrorBoundary } from '@/features/errorTracking';
import { ItemId } from '@/types/jsonApi';

import { AbstractStorage } from '../types';
import { getStorageByType } from './utils';

const safeSetItems = createSagaErrorBoundary(function* safeSetItems(
  storage: AbstractStorage<any>,
  items: Array<{ id: ItemId }>,
) {
  yield call([storage, storage.setItems], items);
});

export function* watchOnIndexResources({ payload }: IndexResourcesActionType) {
  const effects = [...Object.entries(payload)]
    .map(([type, items]) => {
      const storage = getStorageByType(type);

      if (storage) {
        return call(safeSetItems, storage, items);
      }

      return null;
    })
    .filter(Boolean);

  yield all(effects);
}
