import { createAction } from 'redux-actions';

import { UserId } from '@/features/users/types';

import { UPDATE_CURRENT_USER_ID } from './actionTypes';

export const updateCurrentUserId = createAction<UserId>(UPDATE_CURRENT_USER_ID);

export type UpdateCurrentUserIdActionType = ReturnType<
  typeof updateCurrentUserId
>;
