import { Dimensions } from 'react-native';

import { makeUseStyles } from '@/features/styles';

import { CELL_COUNT, ROOT_PADDING } from '../consts';

const { width } = Dimensions.get('window');

const CELL_MARGIN = 15;

const CELL_WIDTH =
  (width - ROOT_PADDING * 2 - (CELL_COUNT - 1) * CELL_MARGIN) / CELL_COUNT;

export default makeUseStyles(({ fonts, palette, utils }) => ({
  cellsRoot: {
    marginTop: 5,
  },
  cell: {
    width: CELL_WIDTH,
    height: CELL_WIDTH,
    borderBottomColor: utils.fade(palette.text.primary, 0.1),
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellText: {
    fontSize: 28,
    color: palette.text.primary,
    fontFamily: fonts.AvenirNext.regular,
  },
}));
