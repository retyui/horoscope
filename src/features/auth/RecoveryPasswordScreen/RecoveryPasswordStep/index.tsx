import { fbt } from 'fbt';
import React from 'react';
import { View } from 'react-native';

import DismissKeyboardView from '@/components/DismissKeyboardView';
import SafeAreaView from '@/components/SafeAreaView';
import TopBar from '@/components/TopBar';
import useAsyncCallback from '@/hooks/useAsyncCallback';

import api from '../../api';
import { pushToConfirmationCodeStep } from '../navigation';
import Form from './Form';
import { Values } from './Form/types';
import useStyles from './styles';

const RecoveryPasswordStep = () => {
  const styles = useStyles();
  const [onSubmit, isRunning, _, error] = useAsyncCallback(
    ({ email }: Values) =>
      api.recoveryPassword(email).then(({ token }) => {
        pushToConfirmationCodeStep({
          resendToken: () => api.recoveryPassword(email),
          token,
        });
      }),
    [],
  );

  return (
    <SafeAreaView>
      <DismissKeyboardView>
        <TopBar
          forceBackButton
          title={fbt('Recover password', 'top bar title')}
        />
        <View style={styles.root}>
          <Form onSubmit={onSubmit} error={error} isRunning={isRunning} />
        </View>
      </DismissKeyboardView>
    </SafeAreaView>
  );
};

export default RecoveryPasswordStep;
