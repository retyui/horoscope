/* eslint-disable no-console */
import { processColor } from 'react-native';

export const getValidColor = (
  color: string | null | undefined,
  defaultColor: string,
): string => {
  try {
    if (!color) {
      return defaultColor;
    }

    const int32Color = processColor(color);

    if (int32Color === undefined || int32Color === null) {
      /* istanbul ignore next */
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`[getValidColor]: Invalid color \`${color}\``);
      }

      return defaultColor;
    }

    // @ts-ignore
    return color;
  } catch {
    /* istanbul ignore next */
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`[getValidColor]: Invalid color \`${color}\``);
    }

    return defaultColor;
  }
};
