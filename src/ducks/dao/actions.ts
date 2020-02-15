import { createAction } from 'redux-actions';

import { ItemId } from '@/types/jsonApi';

import { INDEX_RESOURCES } from './actionTypes';

export type ResourcesIndex = {
  [entityType: string]: Array<{ id: ItemId }>;
};

export const indexResources = createAction<ResourcesIndex>(INDEX_RESOURCES);

export type IndexResourcesActionType = ReturnType<typeof indexResources>;
