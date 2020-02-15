import { makeUseStyles } from '@/features/styles';

export default makeUseStyles(({ fonts, palette }) => ({
  root: {
    fontFamily: fonts.AvenirNext.regular,
    color: palette.text.primary,
  },
  caption: {
    fontSize: 12,
    lineHeight: 18,
  },
  left: { textAlign: 'left' },
  right: { textAlign: 'right' },
  center: { textAlign: 'center' },
  justify: { textAlign: 'justify' },
}));
