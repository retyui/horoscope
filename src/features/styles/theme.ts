import { fonts } from './fonts';
import { palette } from './palette';
import { safeArea } from './safeArea';
import { utils } from './utils';

const theme = { palette, utils, fonts, safeArea };

export type Theme = typeof theme;

export default theme;
