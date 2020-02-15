import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import TouchableOpacity from '@/components/TouchableOpacity';
import concatStyles from '@/utils/style/concatStyles';

import useStyles from './styles';

type Props = {
  onPress?: () => void;
  children?: any;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

const BaseButton = ({ onPress, children, disabled, style }: Props) => {
  const styles = useStyles();

  return (
    <TouchableOpacity
      onPress={disabled ? undefined : onPress}
      style={concatStyles<ViewStyle>(
        styles.root,
        disabled && styles.disabled,
        style,
      )}
    >
      {children}
    </TouchableOpacity>
  );
};

export default BaseButton;
