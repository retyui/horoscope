import React, { ComponentProps } from 'react';
import { TouchableOpacity } from 'react-native';

import TextField from '@/components/TextField';

type Props = ComponentProps<typeof TextField> & {
  onPress?: () => void;
};

const CallingCodeTextField = ({ onPress, ...props }: Props) => (
  <TouchableOpacity activeOpacity={1} onPress={onPress}>
    <TextField {...props} />
  </TouchableOpacity>
);

export default CallingCodeTextField;
