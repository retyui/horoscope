import authRoutes from '@/features/auth/routes';
import { SPLASH_SCREEN_NAME } from '@/features/splashScreen/consts';
import splashRoutes from '@/features/splashScreen/routes';

import mainRoutes from './mainRoutes';

export const initialRouteName = SPLASH_SCREEN_NAME;

const appRoutes = {
  ...authRoutes,
  ...mainRoutes,
  ...splashRoutes,
};

export default appRoutes;
