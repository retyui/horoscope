import { createStackNavigator } from 'react-navigation-stack';

import { AUTH_ROOT_SCREEN_NAME, SIGN_IN_SCREEN_NAME } from './consts/screens';
import signInRoutes from './SignInScreen/routes';
import signUpRoutes from './SignUpScreen/routes';

let routes = {
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
};

export default authRoutes;
