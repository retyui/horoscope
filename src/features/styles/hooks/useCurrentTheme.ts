import { mergeDeepRight } from 'ramda';
import { useMemo } from 'react';
import { useSafeArea } from 'react-native-safe-area-view';

import defaultTheme from '../theme';

const useCurrentTheme = () => {
  const safeArea = useSafeArea();

  return useMemo(() => mergeDeepRight(defaultTheme, { safeArea }), [safeArea]);
};

export default useCurrentTheme;
