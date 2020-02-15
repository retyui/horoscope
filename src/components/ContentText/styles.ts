import { makeUseStyles } from '@/features/styles';

export default makeUseStyles(({ palette }) => ({
  h1: {
    fontSize: 20,
    lineHeight: 28,
    color: palette.text.primary,
  },
  body: {
    fontSize: 13,
    lineHeight: 18,
    color: palette.text.primary,
  },
}));
