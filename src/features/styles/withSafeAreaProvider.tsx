import React, { ComponentType } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const withSafeAreaProvider = (Component: ComponentType<any>) => (props: {}) => (
  <SafeAreaProvider>
    <Component {...props} />
  </SafeAreaProvider>
);

export default withSafeAreaProvider;
