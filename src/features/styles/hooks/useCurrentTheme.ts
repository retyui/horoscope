import { mergeDeepRight } from 'ramda';
import { useMemo } from 'react';
import { useSafeArea } from 'react-native-safe-area-view';

import defaultTheme from '../theme';
import useCompanyTheme from './useCompanyTheme';

const useCurrentTheme = () => {
  const companyTheme = useCompanyTheme();
  const safeArea = useSafeArea();

  return useMemo(
    () => mergeDeepRight(defaultTheme, { ...companyTheme, safeArea }),
    [companyTheme, safeArea],
  );
};

export default useCurrentTheme;
