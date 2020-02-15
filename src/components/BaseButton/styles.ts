import { makeUseStyles } from '@/features/styles';

export default makeUseStyles(({ palette }) => ({
  root: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: palette.accent.primary,
    borderRadius: 50,
    justifyContent: 'center',
    minHeight: 50,
    minWidth: 240,
    overflow: 'hidden',
  },
  disabled: {
    opacity: 0.3,
  },
}));
