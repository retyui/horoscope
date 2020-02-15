import './bootstrap';
import './features/errorTracking/rollbar/init';
import './features/environment/initDynmicEnv';
import './api/init';
import './features/cache/init';
import './features/i18n/init';
import './features/countriesPhoneCodes/consts/device.ts';

import { AppRegistry } from 'react-native';

import { name as appName } from '../app.json';
import App from './features/app';

AppRegistry.registerComponent(appName, () => App);
