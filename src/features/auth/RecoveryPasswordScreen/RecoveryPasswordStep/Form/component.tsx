import { fbt } from 'fbt';
import { FormikProps } from 'formik';
import React from 'react';

import AsyncActionButton from '@/components/AsyncActionButton';
import FormikFieldErrorText from '@/components/FormikFieldErrorText';
import FormikTextField from '@/components/FormikTextField';
import useKeyboardDismiss from '@/hooks/useKeyboardDismiss';

import { EMAIL_KEY } from './consts/fields';
import getErrorMessage from './errorAdapter';
import useStyles from './styles';
import { Props, Values } from './types';

const fields = [EMAIL_KEY];

const RecoveryPasswordForm = ({
  handleSubmit,
  isRunning,
  error,
}: Props & FormikProps<Values>) => {
  const styles = useStyles();
  const onPressSubmitButton = useKeyboardDismiss(handleSubmit);

  return (
    <>
      <FormikTextField
        noLeftRightSpaces
        name={EMAIL_KEY}
        autoCapitalize="none"
        placeholder={fbt('Your email', 'email placeholder text').toString()}
        returnKeyType="done"
        keyboardType="email-address"
        onSubmitEditing={handleSubmit}
        // iOS
        textContentType="emailAddress"
        // Android
        autoCompleteType="email"
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
        <fbt desc="button text">Send reset code</fbt>
      </AsyncActionButton>
    </>
  );
};

export default RecoveryPasswordForm;
