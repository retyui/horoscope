import { createStackNavigator } from 'react-navigation-stack';

import { createDynamicScreen } from '@/features/navigation/utils';

import {
  AUTH_ROOT_SCREEN_NAME,
  ORGANIZATION_PASSWORD_ROOT_SCREEN_NAME,
  SIGN_IN_SCREEN_NAME,
} from './consts/screens';
import recoveryPasswordRoutes from './RecoveryPasswordScreen/routes';
import signInRoutes from './SignInScreen/routes';
import signUpRoutes from './SignUpScreen/routes';

let routes = {
  ...recoveryPasswordRoutes,
  ...signInRoutes,
  ...signUpRoutes,
};

/*
 When it will be changed
 Don't forget to update `if` condition in src/features/developmentScreen/DevMenuButton
*/
if (process.env.SHOW_DEV_MENU === 'true') {
  const {
    default: devMenuRoutes,
  } = require('@/features/developmentScreen/routes');

  routes = {
    ...routes,
    ...devMenuRoutes,
  };
}

const AuthNavigator = createStackNavigator(routes, {
  initialRouteName: SIGN_IN_SCREEN_NAME,
});

const authRoutes = {
  [AUTH_ROOT_SCREEN_NAME]: AuthNavigator,
  [ORGANIZATION_PASSWORD_ROOT_SCREEN_NAME]: {
    screen: createDynamicScreen(() => require('./OrganizationPasswordScreen')),
    navigationOptions: {
      headerShown: false,
    },
  },
};

export default authRoutes;
