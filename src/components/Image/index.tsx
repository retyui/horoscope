import React, { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import FastImage, { FastImageProperties } from 'react-native-fast-image';

import concatStyles from '@/utils/style/concatStyles';

import styles from './styles';

type Props = {
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
  source?: FastImageProperties['source'] | null;
} & Omit<FastImageProperties, 'source' | 'style'>;

const Image = ({ style, ...rest }: Props) => (
  // @ts-ignore
  <FastImage {...rest} style={concatStyles<ViewStyle>(styles.root, style)} />
);

Image.resizeMode = FastImage.resizeMode;

export default Image;
