import { useMemo } from 'react';

import { Color } from '@/types/styles';
import { getValidColor } from '@/utils/style/color';

type Options = {
  color: Color | null | undefined;
  defaultColor: string;
};

const useValidColorStyle = ({ color, defaultColor }: Options) =>
  useMemo(() => ({ color: getValidColor(color, defaultColor) }), [
    color,
    defaultColor,
  ]);

export default useValidColorStyle;
