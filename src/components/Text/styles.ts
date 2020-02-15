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
  '200': { fontFamily: fonts.Muli.extraLight },
  '300': { fontFamily: fonts.Muli.light },
  '400': { fontFamily: fonts.Muli.regular },
  '500': { fontFamily: fonts.Muli.medium },
  '600': { fontFamily: fonts.Muli.semiBold },
  '700': { fontFamily: fonts.Muli.bold },
  '800': { fontFamily: fonts.Muli.extraBold },
  '900': { fontFamily: fonts.Muli.black },
}));
