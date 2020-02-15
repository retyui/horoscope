import React, { useEffect } from 'react';
import { fbt } from 'fbt';
import SafeAreaView from '@/components/SafeAreaView';
import { useDispatch } from '@/redux/hooks';

import useStyles from './styles';
import EllipseIcon from '@/components/EllipseIcon';
import Text from '@/components/Text';
import Button from '@/components/Button';
import {View} from "react-native";

const Welcome = () => {
  const styles = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(appLaunched());
  }, [dispatch]);

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
