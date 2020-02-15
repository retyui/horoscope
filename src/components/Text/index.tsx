import React, { ComponentProps } from 'react';
import { Text as NativeText, TextStyle } from 'react-native';

import concatStyles from '@/utils/style/concatStyles';

import useStyles from './styles';

type Props = {
  align?: 'left' | 'right' | 'center' | 'justify';
  weight?: '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
  children?: any;
} & ComponentProps<typeof NativeText>;

const Text = ({ weight, style, align, ...props }: Props) => {
  const styles = useStyles();

  return (
    <NativeText
      {...props}
      style={concatStyles<TextStyle>(
        styles.root,
        align && styles[align],
        weight && styles[weight],
        style,
      )}
    />
  );
};

export default Text;
