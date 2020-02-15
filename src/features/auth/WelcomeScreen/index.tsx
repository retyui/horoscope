import { fbt } from 'fbt';
import React from 'react';
import { View } from 'react-native';

import Button from '@/components/Button';
import EllipseIcon from '@/components/EllipseIcon';
import SafeAreaView from '@/components/SafeAreaView';
import Text from '@/components/Text';

import useStyles from './styles';

const Welcome = () => {
  const styles = useStyles();

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.innerRoot}>
        <EllipseIcon />
        <Text weight="800" style={styles.welcomeMsg}>
          <fbt desc="Welcome msg">Welcome To </fbt>
          {'\n'}
          <fbt desc="Welcome msg">Horoscope Premium</fbt>
        </Text>
      </View>
      <Button variant="contained">
        <fbt desc="button text">Sign up with Facebook</fbt>
      </Button>
      <Button variant="outlined" style={styles.manuallyBtn}>
        <fbt desc="button text">Select your Zodiac Manually</fbt>
      </Button>
    </SafeAreaView>
  );
};

export default Welcome;
