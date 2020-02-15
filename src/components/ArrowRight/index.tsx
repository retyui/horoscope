import React, { ComponentProps } from 'react';
import { Image } from 'react-native';

type Props = Omit<ComponentProps<typeof Image>, 'source'>;

const ArrowRight = (props: Props) => (
  <Image {...props} source={require('./assets/arrow.png')} />
);

export default ArrowRight;
