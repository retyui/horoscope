import { createStackNavigator } from 'react-navigation-stack';

// import { MAIN_PAGE_SCREEN_NAME } from '@/features/mainPageScreen/consts';
import { MAIN_ROOT_SCREEN_NAME } from './consts';

const mainRoutes = {};

const MainNavigator = createStackNavigator(mainRoutes, {
  initialRouteName: 'FIX ME',
});

export default {
  [MAIN_ROOT_SCREEN_NAME]: MainNavigator,
};
