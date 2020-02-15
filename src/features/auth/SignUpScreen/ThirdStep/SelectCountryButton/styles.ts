import { makeUseStyles } from '@/features/styles';

export default makeUseStyles(({ palette, utils }) => ({
  root: {
    height: 50,
    justifyContent: 'center',
    borderBottomColor: utils.fade(
      palette.text.primary,
      utils.isDark(palette.text.primary) ? 0.03 : 0.1,
    ),
    borderBottomWidth: 2,
    marginBottom: 10,
  },
  text: {
    opacity: 0.4,
    color: palette.text.primary,
    fontSize: 17,
  },
  textWithValue: {
    opacity: 1,
  },
  icon: {
    tintColor: palette.text.primary,
    width: 10,
    height: 18,
    position: 'absolute',
    marginTop: -9,
    top: '50%',
    right: 0,
  },
}));
