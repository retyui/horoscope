import { IntlViewerContext } from 'fbt';

import { LocaleTypes } from './types';

export const setLocale = (locale: LocaleTypes) => {
  IntlViewerContext.locale = locale;
};

// TODO: need extract react value from `react-native-device-info`
setLocale('en_US');
