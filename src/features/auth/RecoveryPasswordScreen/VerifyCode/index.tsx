import { fbt } from 'fbt';
import React from 'react';
import { View } from 'react-native';
import { useNavigationParam } from 'react-navigation-hooks';

import DismissKeyboardView from '@/components/DismissKeyboardView';
import SafeAreaView from '@/components/SafeAreaView';
import TopBar from '@/components/TopBar';
import api from '@/features/auth/api';
import useAsyncCallback from '@/hooks/useAsyncCallback';

import { RESEND_CODE_KEY, TOKEN_KEY } from '../consts/params';
import { pushToSetNewPassword } from '../navigation';
import Form from './Form';
import { Values } from './Form/types';
import Resend from './Resend';
import useStyles from './styles';

const ConfirmationCodeStep = () => {
  const styles = useStyles();
  const token = useNavigationParam<string>(TOKEN_KEY);
  const resendCode = useNavigationParam(RESEND_CODE_KEY);
  const [onSubmit, isRunning, _, error] = useAsyncCallback(
    ({ code }: Values) =>
      api
        .confirmCode({ token, code })
        .then(() => pushToSetNewPassword({ code, token })),
    [],
  );

  return (
    <SafeAreaView>
      <DismissKeyboardView>
        <TopBar title={fbt('Enter confirmation code', 'top bar title')} />
        <View style={styles.root}>
          <Form onSubmit={onSubmit} error={error} isRunning={isRunning} />
          <Resend resendCode={resendCode} />
        </View>
      </DismissKeyboardView>
    </SafeAreaView>
  );
};

export default ConfirmationCodeStep;
