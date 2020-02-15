import { useMemo } from 'react';

import { getCurrentCompanyPalette } from '@/features/currentCompany/selectors';
import { useSelector } from '@/redux/hooks';

const useCompanyTheme = () => {
  const palette = useSelector(getCurrentCompanyPalette);

  return useMemo(() => {
    if (palette) {
      return { palette };
    }

    return {};
  }, [palette]);
};

export default useCompanyTheme;
