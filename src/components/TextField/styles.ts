import { makeUseStyles } from '@/features/styles';

export const TEXT_FIELD_MARGIN_BOTTOM = 13;

export default makeUseStyles(
  ({
    fonts,
    palette: {
      text: { primary: textColor },
    },
    utils: { isDark, fade },
  }) => ({
    labelText: {
      fontFamily: fonts.AvenirNext.regular,
      color: fade(textColor, 0.4),
    },
    rootStyle: {
      position: 'relative',
      minHeight: 45,
      marginBottom: TEXT_FIELD_MARGIN_BOTTOM,
      borderBottomWidth: 2,
      borderBottomColor: fade(textColor, isDark(textColor) ? 0.03 : 0.1),
    },
    inputStyle: {
      backgroundColor: '#00000000',
      fontFamily: fonts.AvenirNext.regular,
      fontSize: 17,
      lineHeight: 22,
      height: 40,
      marginTop: 10,
      color: textColor,
      paddingLeft: 0,
      paddingRight: 0,
    },
  }),
);
