import { createAction } from 'redux-actions';

import { APP_LAUNCHED } from './actionTypes';

export const appLaunched = createAction<void>(APP_LAUNCHED);
