import { pick } from 'ramda';

import { REDUX_STORE_KEY as COMPANIES_REDUX_STORE_KEY } from '@/features/companies/consts';
import { REDUX_STORE_KEY as COMPANY_THEMES_REDUX_STORE_KEY } from '@/features/companiesThemes/consts';
import { REDUX_STORE_KEY as CURRENT_COMPANY_REDUX_STORE_KEY } from '@/features/currentCompany/consts';

export const clearState = pick([
  CURRENT_COMPANY_REDUX_STORE_KEY,
  COMPANIES_REDUX_STORE_KEY,
  COMPANY_THEMES_REDUX_STORE_KEY,
]);
