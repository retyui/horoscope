import React from 'react';
import { ActivityIndicator, View } from 'react-native';

import { useTheme } from '@/features/styles';

import useStyles from './styles';

const LoadProgress = () => {
  const styles = useStyles();
  const theme = useTheme();
  const { primary } = theme.palette.text;

  return (
    <View style={styles.root}>
      <ActivityIndicator color={primary} size="large" />
    </View>
  );
};

export default LoadProgress;
