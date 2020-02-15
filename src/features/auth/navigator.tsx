import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import SelectHoroscope from '@/features/auth/SelectHoroscopeScreen';
import Welcome from '@/features/auth/WelcomeScreen';

import { SELECT_HOROSCOPE, WELCOME_NAME } from './consts/screens';

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator initialRouteName={WELCOME_NAME} headerMode="none">
    <Stack.Screen name={WELCOME_NAME} component={Welcome} />
    <Stack.Screen name={SELECT_HOROSCOPE} component={SelectHoroscope} />
  </Stack.Navigator>
);
