import React from 'react';
import { Text } from 'react-native';

import { goToDevMenu } from '../navigation';
import styles from './styles';

const DevMenuButton = () => (
  <Text style={styles.root} onPress={goToDevMenu}>
    Dev Menu
  </Text>
);

export default DevMenuButton;
