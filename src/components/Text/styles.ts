import { makeUseStyles } from '@/features/styles';

export default makeUseStyles(({ fonts, palette }) => ({
  root: {
    fontFamily: fonts.Muli.regular,
    color: palette.text.primary,
  },
  left: { textAlign: 'left' },
  right: { textAlign: 'right' },
  center: { textAlign: 'center' },
  justify: { textAlign: 'justify' },
}));
