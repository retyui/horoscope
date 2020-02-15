import React, { useCallback } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';

import DismissKeyboardView from '@/components/DismissKeyboardView';
import SafeAreaView from '@/components/SafeAreaView';
import DevMenuButton from '@/features/developmentScreen/DevMenuButton';
import { useDispatch, useSelector } from '@/redux/hooks';

import { authenticate } from '../../actions';
import { getAuthenticationError, isAuthenticating } from '../../selectors';
import Form from '../Form';
import { Values } from '../Form/types';
import useStyles from './styles';

const isIOS = Platform.OS === 'ios';

/*
 * This `View` wrapper need to fix bug on iOS (SafeAreaView + KeyboardAvoidingView)
 * When keyboard appear `<Text/>` jump without animation
 */

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
          <Form
            style={styles.form}
            error={error}
            isRunning={isRunning}
            onSubmit={onSubmit}
          />

          <DevMenuButton />
        </KeyboardAvoidingView>
      </DismissKeyboardView>
    </SafeAreaView>
  );
};

export default SignIn;
