import { makeUseStyles } from '@/features/styles';

export default makeUseStyles(({ palette, fonts }) => ({
  icon: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 12,
    height: 22,
    tintColor: palette.accent.contrastText,
  },
  subTitleText: {
    marginTop: 10,
    fontFamily: fonts.AvenirNext.demiBold,
    fontSize: 13,
    lineHeight: 18,
    color: palette.accent.contrastText,
  },
  text: {
    color: palette.accent.contrastText,
    marginTop: 15,
  },
  titleRoot: {
    position: 'relative',
  },
  titleText: {
    color: palette.accent.contrastText,
    fontSize: 26,
    lineHeight: 28,
    paddingRight: 50,
  },
}));
