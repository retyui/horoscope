import { createStackNavigator } from 'react-navigation-stack';

import { createDynamicScreen } from '@/features/navigation/utils';

import {
  RECOVER_PASSWORD_SCREEN_NAME,
  RECOVER_PASSWORD_SCREEN_NAME_STEP1,
  RECOVER_PASSWORD_SCREEN_NAME_STEP2,
  RECOVER_PASSWORD_SCREEN_NAME_STEP3,
} from '../consts/screens';

const navigationOptions = {
  headerShown: false,
};

const routes = {
  [RECOVER_PASSWORD_SCREEN_NAME_STEP1]: {
    screen: createDynamicScreen(() => require('./RecoveryPasswordStep')),
    navigationOptions,
  },
  [RECOVER_PASSWORD_SCREEN_NAME_STEP2]: {
    screen: createDynamicScreen(() => require('./VerifyCode')),
    navigationOptions,
  },
  [RECOVER_PASSWORD_SCREEN_NAME_STEP3]: {
    screen: createDynamicScreen(() => require('./SetNewPasswordStep')),
    navigationOptions,
  },
};

const RecoverPasswordNavigator = createStackNavigator(routes, {
  initialRouteName: RECOVER_PASSWORD_SCREEN_NAME_STEP1,
});

export default {
  [RECOVER_PASSWORD_SCREEN_NAME]: {
    screen: RecoverPasswordNavigator,
    navigationOptions,
  },
};
