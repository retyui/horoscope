import { makeUseStyles } from '@/features/styles';

export default makeUseStyles(({ palette }) => ({
  root: {
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 6,
    justifyContent: 'center',
    minHeight: 44,
    overflow: 'hidden',
    width: '100%',
  },
  disabled: {
    opacity: 0.3,
  },
  outlined: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: palette.accent.primary,
  },
  contained: {
    backgroundColor: palette.accent.primary,
  },
}));
