import { createStackNavigator } from 'react-navigation-stack';

import contentPageRoutes from '@/features/contentPageScreen/routes';
import externalResourcesRoutes from '@/features/externalResources/routes';
import { MAIN_PAGE_SCREEN_NAME } from '@/features/mainPageScreen/consts';
import mainPageRoutes from '@/features/mainPageScreen/routes';
import withProtectedNavigation from '@/features/protectedNavigation/withProtectedNavigation';
import settingsPageRoutes from '@/features/settingsScreen/routes';

import { MAIN_ROOT_SCREEN_NAME } from './consts';

const mainRoutes = {
  ...contentPageRoutes,
  ...externalResourcesRoutes,
  ...mainPageRoutes,
  ...settingsPageRoutes,
};

const MainNavigator = withProtectedNavigation(
  createStackNavigator(mainRoutes, {
    initialRouteName: MAIN_PAGE_SCREEN_NAME,
  }),
);

export default {
  [MAIN_ROOT_SCREEN_NAME]: MainNavigator,
};
