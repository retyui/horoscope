import React from 'react';
import { Provider } from 'react-redux';

export const createMockReduxStore = (store = {}) => ({
  getState() {},
  dispatch() {},
  subscribe() {},
  ...store,
});

export const createMockProvider = (store: any) => ({ children }: any) => (
  <Provider store={store}>{children}</Provider>
);
