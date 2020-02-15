import { combineReducers } from 'redux';

import authReducer from '@/features/auth/reducer';
import currentUserReducer from '@/features/currentUser/reducer';
import usersReducer from '@/features/users/reducer';

const appReducer = combineReducers({
  ...authReducer,
  ...usersReducer,
  ...currentUserReducer,
});

export default appReducer;
