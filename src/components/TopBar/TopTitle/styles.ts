import { makeUseStyles } from '@/features/styles';

export default makeUseStyles(({ palette, fonts }) => ({
  root: {
    color: palette.text.primary,
    fontFamily: fonts.AvenirNext.bold,
    fontSize: 26,
    paddingHorizontal: 20,
    marginBottom: 25,
  },
}));
