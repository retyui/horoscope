import React, { ComponentType } from 'react';

import { setNavigator } from './instance';

export const withNavigationExtractor = (App: ComponentType<any>) => {
  const WithNavigationExtractor = (props: {}) => (
    <App {...props} ref={setNavigator} />
  );

  return WithNavigationExtractor;
};
