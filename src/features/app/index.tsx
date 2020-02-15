import { compose } from 'ramda';
import React, { ComponentType } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from 'react-native-stylex';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import { withNavigationExtractor } from '@/features/navigation/withNavigationExtractor';
import useCurrentTheme from '@/features/styles/hooks/useCurrentTheme';
import createStore from '@/redux/createStore';
import { withReduxProvider } from '@/redux/withRedux';

import routes, { initialRouteName } from './routes';

const store = createStore();

const RootNavigator = createSwitchNavigator(routes, { initialRouteName });

const Navigator = compose(
  withNavigationExtractor,
  // @ts-ignore
  createAppContainer,
)(RootNavigator);

const App = (props: {}) => {
  const currentTheme = useCurrentTheme();

  return (
    <ThemeProvider value={currentTheme}>
      <Navigator {...props} />
    </ThemeProvider>
  );
};

const withSafeAreaProvider = (Component: ComponentType<any>) => (props: {}) => (
  <SafeAreaProvider>
    <Component {...props} />
  </SafeAreaProvider>
);

export default withSafeAreaProvider(withReduxProvider(store)(App));
