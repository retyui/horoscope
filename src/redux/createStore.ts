import {
  applyMiddleware,
  compose,
  createStore as createReduxStore,
} from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

const composeEnhancers: typeof compose =
  process.env.NODE_ENV === 'development'
    ? (global as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose;

const createStore = () => {
  const saga = createSagaMiddleware();
  const store = createReduxStore(
    rootReducer,
    composeEnhancers(applyMiddleware(saga)),
  );

  saga.run(rootSaga);

  return store;
};

export default createStore;
