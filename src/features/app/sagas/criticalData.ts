import { select, take } from 'redux-saga/effects';

import { LOAD_CURRENT_COMPANY_SUCCESS } from '@/features/currentCompany/actionTypes';
import { getCurrentCompanyId } from '@/features/currentCompany/selectors';

export function* waitCurrentCompanyData() {
  const currentCompanyId = yield select(getCurrentCompanyId);

  if (!currentCompanyId) {
    yield take(LOAD_CURRENT_COMPANY_SUCCESS);
  }
}
