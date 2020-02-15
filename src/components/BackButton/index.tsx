import React from 'react';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';

import ArrowLeft from '@/components/ArrowLeft';
import concatStyles from '@/utils/style/concatStyles';

import useStyles from './styles';

type Props = {
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  tintColor?: string;
};

const BackButton = ({ style, onPress, tintColor }: Props) => {
  const styles = useStyles();

  return (
    <TouchableOpacity
      style={concatStyles<ViewStyle>(styles.root, style)}
      onPress={onPress}
    >
      <ArrowLeft style={[styles.arrowIcon, tintColor ? { tintColor } : null]} />
    </TouchableOpacity>
  );
};

export default BackButton;
