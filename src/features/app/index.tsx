import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { ThemeProvider } from 'react-native-stylex';

import { setNavigator } from '@/features/navigation/instance';
import Splash from '@/features/splashScreen/Splash';
import useCurrentTheme from '@/features/styles/hooks/useCurrentTheme';
import withSafeAreaProvider from '@/features/styles/withSafeAreaProvider';
import createStore from '@/redux/createStore';
import { withReduxProvider } from '@/redux/withRedux';
import Welcome from '@/features/auth/WelcomeScreen';
import SelectHoroscope from '@/features/auth/SelectHoroscopeScreen';

const store = createStore();
const Stack = createStackNavigator();
const App = () => {
  const currentTheme = useCurrentTheme();

  return (
    <ThemeProvider value={currentTheme}>
      <NavigationContainer ref={setNavigator}>
        <Stack.Navigator initialRouteName="SelectHoroscope" headerMode="none">
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="SelectHoroscope" component={SelectHoroscope} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default withSafeAreaProvider(withReduxProvider(store)(App));
