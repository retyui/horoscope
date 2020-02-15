import { createDynamicScreen } from '@/features/navigation/utils';

import { SIGN_IN_SCREEN_NAME } from '../consts/screens';

export default {
  [SIGN_IN_SCREEN_NAME]: {
    screen: createDynamicScreen(() => require('./SignIn')),
    navigationOptions: {
      headerShown: false,
    },
  },
};
