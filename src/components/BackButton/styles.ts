import { makeUseStyles } from '@/features/styles';

export default makeUseStyles(({ palette }) => ({
  root: {
    height: 60,
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  arrowIcon: {
    tintColor: palette.text.primary,
    width: 12,
    height: 20,
  },
}));
