import { createDynamicScreen } from '@/features/navigation/utils';

import { DEV_MENU_SCREEN_NAME } from './consts';

export default {
  [DEV_MENU_SCREEN_NAME]: {
    screen: createDynamicScreen(() => require('./DevMenu')),
    navigationOptions: {
      headerShown: false,
    },
  },
};
