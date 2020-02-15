import crashlytics from '@react-native-firebase/crashlytics';

import { getApplicationName } from '@/features/environment';
import { APPLICATION_NAME_KEY } from '@/features/errorTracking/consts/extraParams';

import { createSafeAsyncFunction } from '../utils';

const init = createSafeAsyncFunction(() =>
  crashlytics().setAttribute(APPLICATION_NAME_KEY, getApplicationName()),
);

init();
