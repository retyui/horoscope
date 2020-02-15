import React, { useEffect } from 'react';

import SafeAreaView from '@/components/SafeAreaView';
import { useDispatch } from '@/redux/hooks';

import useStyles from './styles';
import EllipseIcon from '@/components/EllipseIcon';
import Text from "@/components/Text";

const Welcome = () => {
  const styles = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(appLaunched());
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.root}>
      <EllipseIcon />

      <Text style={styles.welcomeMsg}>
        <fbt desc='Welcome msg'>{'Welcome To \nHoroscope Premium'}</fbt>
      </Text>
    </SafeAreaView>
  );
};

export default Welcome;
