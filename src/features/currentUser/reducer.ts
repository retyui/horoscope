import { combineReducers } from 'redux';
import { handleAction } from 'redux-actions';

import { UpdateCurrentUserIdActionType } from './actions';
import { UPDATE_CURRENT_USER_ID } from './actionTypes';
import { REDUX_STORE_KEY } from './consts';

const userId = handleAction(
  UPDATE_CURRENT_USER_ID,
  (_, { payload: id }: UpdateCurrentUserIdActionType) => id,
  '',
);

const reducer = combineReducers({
  userId,
});

export default {
  [REDUX_STORE_KEY]: reducer,
};
