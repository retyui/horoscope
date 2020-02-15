import parseColor from 'color';
import { clamp } from 'ramda';

type ColorKeys = 'fade' | 'darken' | 'lighten' | 'whiten' | 'blacken';

const wrapColorFucntion = (propName: ColorKeys) => (
  color: string,
  value: number,
) =>
  parseColor(color)
    [propName](value)
    .rgb()
    .string();

export const isLight = (color: string): boolean => parseColor(color).isLight();
export const isDark = (color: string): boolean => parseColor(color).isDark();

export const darken = wrapColorFucntion('darken');
export const lighten = wrapColorFucntion('lighten');
export const whiten = wrapColorFucntion('whiten');
export const blacken = wrapColorFucntion('blacken');

const wrapperFade = wrapColorFucntion('fade');
const onlyNumberBetweenZeroAndOne = clamp(0, 1);

export const fade = (color: string, ratio: number) =>
  wrapperFade(color, 1 - onlyNumberBetweenZeroAndOne(ratio));
