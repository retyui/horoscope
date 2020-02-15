import React, { ComponentProps } from 'react';
import { ImageStyle } from 'react-native';

import concatStyles from '@/utils/style/concatStyles';

import ArrowRight from '../ArrowRight';
import useStyles from './styles';

type Props = ComponentProps<typeof ArrowRight>;

const ArrowLeft = ({ style, ...props }: Props) => {
  const styles = useStyles();

  return (
    <ArrowRight
      {...props}
      style={concatStyles<ImageStyle>(styles.root, style)}
    />
  );
};

export default ArrowLeft;
