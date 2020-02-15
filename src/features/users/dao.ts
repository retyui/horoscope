import { prop } from 'ramda';

import { createDao } from '@/ducks/dao';

import { ENTITY_TYPE, REDUX_STORE_KEY } from './consts';
import { UserAttributes, UserId } from './types';

const dao = createDao<typeof ENTITY_TYPE, UserAttributes, UserId>({
  type: ENTITY_TYPE,
  getRoot: prop(REDUX_STORE_KEY),
});

export default dao;
