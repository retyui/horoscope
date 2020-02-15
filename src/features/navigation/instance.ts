import { NavigationContainer } from '@react-navigation/native';

const config: {
  navigator: typeof NavigationContainer | null;
} = { navigator: null };

export function setNavigator(nav: typeof NavigationContainer) {
  config.navigator = nav;
}

export const getNavigatorInstance = () => config.navigator;
