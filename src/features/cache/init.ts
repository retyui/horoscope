import AsyncStorage from '@react-native-community/async-storage';

import storages from './storages';

storages.forEach((storage) => storage.setStorage(AsyncStorage));
