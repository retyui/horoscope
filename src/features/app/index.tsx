import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { ThemeProvider } from 'react-native-stylex';

import getNavigator from '@/features/auth/navigator';
import { setNavigator } from '@/features/navigation/instance';
import useCurrentTheme from '@/features/styles/hooks/useCurrentTheme';
import withSafeAreaProvider from '@/features/styles/withSafeAreaProvider';
import createStore from '@/redux/createStore';
import { withReduxProvider } from '@/redux/withRedux';

const store = createStore();

const App = () => {
  const currentTheme = useCurrentTheme();

  return (
    <ThemeProvider value={currentTheme}>
      <NavigationContainer ref={setNavigator}>
        {getNavigator()}
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default withSafeAreaProvider(withReduxProvider(store)(App));
