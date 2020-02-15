import React from 'react';
import { View } from 'react-native';

import useStyles from './styles';

const EllipseIcon = () => {
  const styles = useStyles();

  return (
    <View style={styles.root}>
      <View style={[styles.innerRoot, styles.innerRoot0]} />
      <View style={[styles.innerRoot, styles.innerRoot1]} />
      <View style={[styles.innerRoot, styles.innerRoot2]} />
    </View>
  );
};

export default EllipseIcon;
