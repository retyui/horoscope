import React from 'react';
import { View } from 'react-native';

import useStyles from './styles';

type Props = {
  children: any;
};

const Container = ({ children }: Props) => {
  const styles = useStyles();

  return <View style={styles.root}>{children}</View>;
};

export default Container;
