import React, { ComponentProps } from 'react';
import { TouchableOpacity } from 'react-native';

type Props = { children: any } & ComponentProps<typeof TouchableOpacity>;

const Touchable = ({ ...props }: Props) => (
  <TouchableOpacity activeOpacity={0.5} {...props} />
);

export default Touchable;
