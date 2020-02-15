import { StatusBarStyle } from 'react-native';

import { isDark, isLight } from './color';

export const getBarStyleByTextColor = (textColor: string): StatusBarStyle => {
  if (isLight(textColor)) {
    return 'light-content';
  }

  if (isDark(textColor)) {
    return 'dark-content';
  }

  return 'default';
};

export const getBarStyleByBackgroundColor = (
  bgColor: string,
): StatusBarStyle => {
  if (isLight(bgColor)) {
    return 'dark-content';
  }

  if (isDark(bgColor)) {
    return 'light-content';
  }

  return 'default';
};
