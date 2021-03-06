import React, { useEffect } from 'react';

import SafeAreaView from '@/components/SafeAreaView';
import { useDispatch } from '@/redux/hooks';

import useStyles from './styles';
import EllipseIcon from '@/components/EllipseIcon';

const Splash = () => {
  const styles = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(appLaunched());
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.root}>
      <EllipseIcon />
    </SafeAreaView>
  );
};

export default Splash;
