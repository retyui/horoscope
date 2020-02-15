import { fbt } from 'fbt';
import { FormikProps } from 'formik';
import React from 'react';

import AsyncActionButton from '@/components/AsyncActionButton';
import FormikFieldErrorText from '@/components/FormikFieldErrorText';
import FormikTextField from '@/components/FormikTextField';
import useKeyboardDismiss from '@/hooks/useKeyboardDismiss';
import useOnSubmitEditing from '@/hooks/useOnSubmitEditing';

import getErrorMessage from './errorAdapter';
import { CONFIRM_NEW_PASSWORD_KEY, NEW_PASSWORD } from './fields';
import useStyles from './styles';
import { Props, Values } from './types';

const fields = [NEW_PASSWORD, CONFIRM_NEW_PASSWORD_KEY];

const SetNewPassword = ({
  handleSubmit,
  isRunning,
  error,
}: Props & FormikProps<Values>) => {
  const styles = useStyles();
  const onPressSubmitButton = useKeyboardDismiss(handleSubmit);
  const [fieldRef, focusField] = useOnSubmitEditing();

  return (
    <>
      <FormikTextField
        autoFocus
        name={NEW_PASSWORD}
        onSubmitEditing={focusField}
        placeholder={fbt(
          'New password',
          'password field placeholder text',
        ).toString()}
        returnKeyType="next"
        secureTextEntry
        // iOS
        textContentType="newPassword"
        // Android
        autoCompleteType="password"
      />
      <FormikTextField
        ref={fieldRef}
        name={CONFIRM_NEW_PASSWORD_KEY}
        onSubmitEditing={handleSubmit}
        placeholder={fbt(
          'Confirm new password',
          'password field placeholder text',
        ).toString()}
        returnKeyType="done"
        secureTextEntry
        // iOS
        textContentType="newPassword"
        // Android
        autoCompleteType="password"
      />

      <FormikFieldErrorText fields={fields} variant="afterTextField">
        {getErrorMessage(error)}
      </FormikFieldErrorText>

      <AsyncActionButton
        error={error}
        isRunning={isRunning}
        style={styles.submitButton}
        onPress={onPressSubmitButton}
      >
        <fbt desc="button text">Save password</fbt>
      </AsyncActionButton>
    </>
  );
};

export default SetNewPassword;
