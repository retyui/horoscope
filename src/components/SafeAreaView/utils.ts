import { Platform } from 'react-native';
import { ForceInsetProp } from 'react-native-safe-area-view';

export const shouldAddStatusBarPadding = (forceInset?: ForceInsetProp) => {
  if (Platform.OS === 'android') {
    if (
      forceInset &&
      (forceInset.top === 'never' || forceInset.vertical === 'never')
    ) {
      return false;
    }

    return true;
  }

  return false;
};
