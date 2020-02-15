import crashlytics from '@react-native-firebase/crashlytics';

import { Person } from '../types';
import { createSafeAsyncFunction, createSafeFunction } from '../utils';

export const setPerson = createSafeAsyncFunction(
  ({ email, id, name }: Person) =>
    Promise.all([
      crashlytics().setUserId(id),
      crashlytics().setUserName(name),
      crashlytics().setUserEmail(email),
    ]),
);

// https://firebase.google.com/docs/crashlytics/customize-crash-reports#android
// If you ever need to clear a user identifier after you set it, reset the value to a blank string.
export const clearPerson = createSafeAsyncFunction(() =>
  Promise.all([
    crashlytics().setUserId(''),
    crashlytics().setUserName(''),
    crashlytics().setUserEmail(''),
  ]),
);

export const trackException = createSafeFunction((error: Error) =>
  crashlytics().recordError(error),
);
