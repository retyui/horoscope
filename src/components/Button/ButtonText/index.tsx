import React from 'react';
import { StyleProp, TextStyle } from 'react-native';

import Text from '@/components/Text';

import useStyles from './styles';

type Props = {
  children: any;
  variant: 'outlined' | 'contained';
  style?: StyleProp<TextStyle>;
};

const ButtonText = ({ variant, children, style }: Props) => {
  const styles = useStyles();

  return (
    <Text weight="700" style={[styles.text, styles[variant], style]}>
      {children}
    </Text>
  );
};

export default ButtonText;
