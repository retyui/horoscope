import React, { useCallback, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';

import LoadError from '@/components/LazyLoad/LoadError';
import SafeAreaView from '@/components/SafeAreaView';
import { tryLoadCurrentCompany } from '@/features/currentCompany/actions';
import { getError, isLoading } from '@/features/currentCompany/selectors';
import { appLaunched } from '@/features/navigation/actions';
import { useDispatch, useSelector } from '@/redux/hooks';

import useStyles from './styles';

const Splash = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const loading = useSelector(isLoading);
  const error = useSelector(getError);
  const tryLoadCurrentCompanyAgain = useCallback(
    () => dispatch(tryLoadCurrentCompany()),
    [dispatch],
  );

  useEffect(() => {
    dispatch(appLaunched());
  }, [dispatch]);

  if (loading) {
    return (
      <SafeAreaView style={styles.root}>
        <ActivityIndicator color="#000" size="large" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.root}>
        <LoadError error={error} tryAgain={tryLoadCurrentCompanyAgain} />
      </SafeAreaView>
    );
  }

  return null;
};

export default Splash;
