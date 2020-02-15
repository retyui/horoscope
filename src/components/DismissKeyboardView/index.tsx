import React, { ComponentProps } from 'react';
import {
  Keyboard,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';

import concatStyles from '@/utils/style/concatStyles';

import styles from './styles';

type Props = { children: any } & ComponentProps<typeof View>;

const DismissKeyboardView = ({ children, style, ...props }: Props) => (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <View {...props} style={concatStyles<ViewStyle>(styles.root, style)}>
      {children}
    </View>
  </TouchableWithoutFeedback>
);

export default DismissKeyboardView;
