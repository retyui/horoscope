import { createStackNavigator } from 'react-navigation-stack';

import countriesPhoneCodesRoutes from '@/features/countriesPhoneCodes/routes';
import { createDynamicScreen } from '@/features/navigation/utils';

import {
  SIGN_UP_SCREEN_NAME,
  SIGN_UP_SCREEN_NAME_STEP1,
  SIGN_UP_SCREEN_NAME_STEP2,
  SIGN_UP_SCREEN_NAME_STEP3,
  SIGN_UP_SCREEN_NAME_STEP4,
} from '../consts/screens';
import withFormProvider from './withFormProvider';

const navigationOptions = {
  headerShown: false,
};

const routes = {
  ...countriesPhoneCodesRoutes,
  [SIGN_UP_SCREEN_NAME_STEP1]: {
    screen: createDynamicScreen(() => require('./FirstStep')),
    navigationOptions,
  },
  [SIGN_UP_SCREEN_NAME_STEP2]: {
    screen: createDynamicScreen(() => require('./SecondStep')),
    navigationOptions,
  },
  [SIGN_UP_SCREEN_NAME_STEP3]: {
    screen: createDynamicScreen(() => require('./ThirdStep')),
    navigationOptions,
  },
  [SIGN_UP_SCREEN_NAME_STEP4]: {
    screen: createDynamicScreen(() => require('./FourthStep')),
    navigationOptions,
  },
};

const SignUpNavigator = withFormProvider(
  createStackNavigator(routes, {
    initialRouteName: SIGN_UP_SCREEN_NAME_STEP1,
  }),
);

export default {
  [SIGN_UP_SCREEN_NAME]: {
    screen: SignUpNavigator,
    navigationOptions,
  },
};
