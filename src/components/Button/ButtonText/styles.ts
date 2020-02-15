import { makeUseStyles } from '@/features/styles';

export default makeUseStyles(({ palette }) => ({
  text: {
    fontSize: 14,
  },
  outlined: {
    color: palette.accent.primary,
  },
  contained: {
    color: palette.accent.contrastText,
  },
}));
