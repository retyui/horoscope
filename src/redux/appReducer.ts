import { combineReducers } from 'redux';

import authReducer from '@/features/auth/reducer';
import companiesReducer from '@/features/companies/reducer';
import companiesThemesReducer from '@/features/companiesThemes/reducer';
import blocksReducer from '@/features/contentBlocks/reducer';
import pagesReducer from '@/features/contentPages/reducer';
import currentCompanyReducer from '@/features/currentCompany/reducer';
import currentUserReducer from '@/features/currentUser/reducer';
import usersReducer from '@/features/users/reducer';

const appReducer = combineReducers({
  ...authReducer,
  ...pagesReducer,
  ...blocksReducer,
  ...usersReducer,
  ...currentUserReducer,
  ...companiesReducer,
  ...currentCompanyReducer,
  ...companiesThemesReducer,
});

export default appReducer;
