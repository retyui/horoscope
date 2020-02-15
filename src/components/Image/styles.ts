import { makeUseStyles } from '@/features/styles';

export default makeUseStyles(({ palette, utils }) => ({
  root: {
    backgroundColor: utils.fade(palette.text.primary, 0.03),
  },
}));
