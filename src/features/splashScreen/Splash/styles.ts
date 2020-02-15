import { makeUseStyles } from '@/features/styles';

export default makeUseStyles(({ palette }) => ({
  root: {
    flex: 1,
    backgroundColor: palette.background.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sloganText: {
    marginTop: 20,
  },
}));
