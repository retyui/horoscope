import { propEq } from 'ramda';

import { DEAUTHORIZE } from '@/features/auth/actionTypes';

import appReducer from './appReducer';
import { clearState } from './utils';

const isDeauthorizeAction = propEq('type', DEAUTHORIZE);

const rootReducer: typeof appReducer = (state, action) => {
  if (isDeauthorizeAction(action)) {
    return appReducer(
      // @ts-ignore
      clearState(state),
      action,
    );
  }

  return appReducer(state, action);
};

export default rootReducer;
