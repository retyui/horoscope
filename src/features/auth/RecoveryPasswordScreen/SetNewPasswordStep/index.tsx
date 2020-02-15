import { fbt } from 'fbt';
import React from 'react';
import { View } from 'react-native';
import { useNavigationParam } from 'react-navigation-hooks';

import ActionButton from '@/components/ActionButton';
import DismissKeyboardView from '@/components/DismissKeyboardView';
import { SuccessMessage } from '@/components/Messages';
import SafeAreaView from '@/components/SafeAreaView';
import TopBar from '@/components/TopBar';
import api from '@/features/auth/api';
import { navigateToSignIn } from '@/features/auth/navigation';
import useAsyncCallback from '@/hooks/useAsyncCallback';

import { CODE_KEY, TOKEN_KEY } from '../consts/params';
import Form from './Form';
import { Values } from './Form/types';
import useStyles from './styles';

const SetNewPasswordStep = () => {
  const styles = useStyles();
  const token = useNavigationParam<string>(TOKEN_KEY);
  const code = useNavigationParam<string>(CODE_KEY);
  const [onSubmit, isRunning, payload, error] = useAsyncCallback(
    ({ new_password }: Values) =>
      api.updatePassword({ token, code, password: new_password }),
    [],
  );

  return (
    <SafeAreaView>
      {payload ? (
        <SuccessMessage
          title={fbt('Successfully', 'success reset password message title')}
          subTitle={fbt(
            'Your password has been reset',
            'success reset password message description',
          )}
        >
          <ActionButton onPress={navigateToSignIn}>
            <fbt desc="success reset password message button text">
              Continue
            </fbt>
          </ActionButton>
        </SuccessMessage>
      ) : (
        <DismissKeyboardView>
          <TopBar title={fbt('Set new password', 'top bar title')} />
          <View style={styles.root}>
            <Form error={error} onSubmit={onSubmit} isRunning={isRunning} />
          </View>
        </DismissKeyboardView>
      )}
    </SafeAreaView>
  );
};

export default SetNewPasswordStep;
