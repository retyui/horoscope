import { createDynamicScreen } from '@/features/navigation/utils';

import { SPLASH_SCREEN_NAME } from './consts';

export default {
  [SPLASH_SCREEN_NAME]: {
    screen: createDynamicScreen(() => require('./Splash')),
  },
};
