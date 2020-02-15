import { NavigationContainer } from 'react-navigation';

const config: {
  navigator: NavigationContainer | null;
} = { navigator: null };

export function setNavigator(nav: NavigationContainer) {
  config.navigator = nav;
}

export const getNavigatorInstance = () => config.navigator;
