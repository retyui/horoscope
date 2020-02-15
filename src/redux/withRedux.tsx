import React, { ComponentType } from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';

export const withReduxProvider = (store: Store<any, any>) => (
  WrappedComponent: ComponentType<any>,
) => {
  const WithReduxProvider = (props: {}) => (
    <Provider store={store}>
      <WrappedComponent {...props} />
    </Provider>
  );

  return WithReduxProvider;
};
