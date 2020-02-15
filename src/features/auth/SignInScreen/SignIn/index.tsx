import { fbt } from 'fbt';
import React, { useCallback } from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';

import DismissKeyboardView from '@/components/DismissKeyboardView';
import SafeAreaView from '@/components/SafeAreaView';
import Text from '@/components/Text';
import Logo from '@/features/currentCompany/Logo';
import SloganText from '@/features/currentCompany/SloganText';
import DevMenuButton from '@/features/developmentScreen/DevMenuButton';
import { useDispatch, useSelector } from '@/redux/hooks';

import { authenticate } from '../../actions';
import { pushToRecoveryPassword, pushToSignUp } from '../../navigation';
import { getAuthenticationError, isAuthenticating } from '../../selectors';
import Form from '../Form';
import { Values } from '../Form/types';
import useStyles from './styles';

const isIOS = Platform.OS === 'ios';

/*
 * This `View` wrapper need to fix bug on iOS (SafeAreaView + KeyboardAvoidingView)
 * When keyboard appear `<Text/>` jump without animation
 */
const ViewFixIos = View;

const SignIn = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const isRunning = useSelector(isAuthenticating);
  const error = useSelector(getAuthenticationError);
  const onSubmit = useCallback(
    (values: Values) => {
      dispatch(authenticate(values));
    },
    [dispatch],
  );

  return (
    <SafeAreaView>
      <DismissKeyboardView>
        <KeyboardAvoidingView
          behavior="padding"
          enabled={isIOS}
          style={styles.root}
        >
          <Logo />
          <ViewFixIos>
            <SloganText style={styles.sloganText} />
          </ViewFixIos>

          <Form
            style={styles.form}
            error={error}
            isRunning={isRunning}
            onSubmit={onSubmit}
          />

          <ViewFixIos>
            <Text
              suppressHighlighting
              variant="caption"
              align="center"
              style={styles.signUpButton}
              onPress={pushToSignUp}
            >
              <fbt desc="sign up button text">No account? Sign up!</fbt>
            </Text>
            <Text
              suppressHighlighting
              variant="caption"
              align="center"
              style={styles.forgotButton}
              onPress={pushToRecoveryPassword}
            >
              <fbt desc="forgot button text">Forgot password?</fbt>
            </Text>
          </ViewFixIos>
          <DevMenuButton />
        </KeyboardAvoidingView>
      </DismissKeyboardView>
    </SafeAreaView>
  );
};

export default SignIn;
