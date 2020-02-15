import { REDUX_STORE_KEY } from './consts';
import dao from './dao';

const { reducer } = dao;

export default {
  [REDUX_STORE_KEY]: reducer,
};
