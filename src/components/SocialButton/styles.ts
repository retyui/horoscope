import { makeUseStyles } from '@/features/styles';

export default makeUseStyles(({ palette, utils }) => ({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 60,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: utils.fade(
      palette.text.primary,
      utils.isDark(palette.text.primary) ? 0.05 : 0.15,
    ),
  },
  socialIcon: {
    tintColor: palette.text.primary,
  },
  text: {
    paddingHorizontal: 30,
    marginRight: 'auto',
    fontSize: 16,
    lineHeight: 22,
    color: palette.text.primary,
  },
  arrowIcon: {
    tintColor: palette.text.primary,
    width: 11,
    height: 18,
  },
}));
