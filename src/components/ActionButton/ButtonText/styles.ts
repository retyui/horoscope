import { makeUseStyles } from '@/features/styles';

export default makeUseStyles(({ palette, fonts }) => ({
  text: {
    fontSize: 20,
    fontFamily: fonts.AvenirNext.demiBold,
    color: palette.accent.contrastText,
  },
}));
