import React, { ComponentProps } from 'react';
import { Text as NativeText, TextStyle } from 'react-native';

import concatStyles from '@/utils/style/concatStyles';

import useStyles from './styles';

type Props = {
  align?: 'left' | 'right' | 'center' | 'justify';
  variant?: 'caption';
  children?: any;
} & ComponentProps<typeof NativeText>;

const Text = ({ style, align, variant, ...props }: Props) => {
  const styles = useStyles();

  return (
    <NativeText
      {...props}
      style={concatStyles<TextStyle>(
        styles.root,
        variant && styles[variant],
        align && styles[align],
        style,
      )}
    />
  );
};

export default Text;
