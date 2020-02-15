import React from 'react';
import { TextStyle } from 'react-native';

import { getFontFamily } from '@/components/ContentText/utils';
import BaseText from '@/components/Text';
import { useTheme } from '@/features/styles';
import concatStyles from '@/utils/style/concatStyles';

import useStyles from './styles';
import { Props } from './types';

const ContentText = ({
  children,
  variant = 'body',
  fontStyle = 'normal',
  style,
  ...rest
}: Props) => {
  const styles = useStyles();
  const theme = useTheme();

  return (
    <BaseText
      {...rest}
      style={concatStyles<TextStyle>(
        styles[variant],
        { fontFamily: getFontFamily({ theme, variant, fontStyle }) },
        style,
      )}
    >
      {children}
    </BaseText>
  );
};

export default ContentText;
