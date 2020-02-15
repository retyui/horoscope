import { ItemId } from '@/types/jsonApi';

import { IndexResourcesActionType } from '../../../actions';
import { ERROR_TYPE, REDUX_ACTION_TYPE, SUCCESS_TYPE } from './actionTypes';

export const reduxAction = (payload: IndexResourcesActionType) => ({
  type: REDUX_ACTION_TYPE,
  payload,
});

export const requestSuccess = (payload: Array<ItemId>) => ({
  type: SUCCESS_TYPE,
  payload,
});

export const requestFailed = (payload: Error) => ({
  type: ERROR_TYPE,
  payload,
});
