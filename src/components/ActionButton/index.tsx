import React, { ComponentProps } from 'react';
import { StyleProp, TextStyle } from 'react-native';

import BaseButton from '@/components/BaseButton';

import ButtonText from './ButtonText';

type Props = {
  children: any;
  textStyle?: StyleProp<TextStyle>;
} & Omit<ComponentProps<typeof BaseButton>, 'children'>;

const ActionButton = ({ children, textStyle, ...props }: Props) => {
  return (
    <BaseButton {...props}>
      <ButtonText style={textStyle}>{children}</ButtonText>
    </BaseButton>
  );
};

export default ActionButton;
