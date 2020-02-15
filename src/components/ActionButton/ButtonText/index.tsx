import React from 'react';
import { StyleProp, TextStyle } from 'react-native';

import Text from '@/components/Text';

import useStyles from './styles';

type Props = {
  children: any;
  style?: StyleProp<TextStyle>;
};

const ButtonText = ({ children, style }: Props) => {
  const styles = useStyles();

  return <Text style={[styles.text, style]}>{children}</Text>;
};

export default ButtonText;
