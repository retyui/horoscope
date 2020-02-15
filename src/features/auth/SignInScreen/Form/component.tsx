import { fbt } from 'fbt';
import { FormikProps } from 'formik';
import React from 'react';
import { View } from 'react-native';

import AsyncActionButton from 'Button';
import FormikFieldErrorText from '@/components/FormikFieldErrorText';
import FormikTextField from '@/components/FormikTextField';
import useKeyboardDismiss from '@/hooks/useKeyboardDismiss';
import useOnSubmitEditing from '@/hooks/useOnSubmitEditing';

import { EMAIL_KEY, PASSWORD_KEY } from './consts/fields';
import getErrorMessage from './errorAdapter';
import useStyles from './styles';
import { Props, Values } from './types';

const fields = [EMAIL_KEY, PASSWORD_KEY];

const SignInForm = ({
  style,
  handleSubmit,
  isRunning,
  error,
}: Props & FormikProps<Values>) => {
  const styles = useStyles();
  const onPressSubmitButton = useKeyboardDismiss(handleSubmit);
  const [passwordFieldRef, focusPasswordField] = useOnSubmitEditing();

  return (
    <View style={style}>
      <FormikTextField
        noLeftRightSpaces
        name={EMAIL_KEY}
        autoCapitalize="none"
        keyboardType="email-address"
        onSubmitEditing={focusPasswordField}
        placeholder={fbt(
          'Email',
          'login field placeholder text  on the sign-in form',
        ).toString()}
        returnKeyType="next"
        // iOS
        textContentType="emailAddress"
        // Android
        autoCompleteType="email"
      />
      <FormikTextField
        secureTextEntry
        ref={passwordFieldRef}
        name={PASSWORD_KEY}
        onSubmitEditing={handleSubmit}
        placeholder={fbt(
          'Password',
          'password field placeholder text on the sign-in form',
        ).toString()}
        returnKeyType="done"
        // iOS
        textContentType="password"
        // Android
        autoCompleteType="password"
      />
      <FormikFieldErrorText fields={fields} variant="afterTextField">
        {getErrorMessage(error)}
      </FormikFieldErrorText>

      <AsyncActionButton
        error={error}
        isRunning={isRunning}
        onPress={onPressSubmitButton}
        style={styles.submitButton}
      >
        <fbt desc="Submit button text">Sign in</fbt>
      </AsyncActionButton>
    </View>
  );
};

export default SignInForm;
