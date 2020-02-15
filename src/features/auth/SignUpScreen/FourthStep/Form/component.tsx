import { fbt } from 'fbt';
import { FormikProps } from 'formik';
import React from 'react';

import FormikFieldErrorText from '@/components/FormikFieldErrorText';
import FormikTextField from '@/components/FormikTextField';
import useKeyboardDismiss from '@/hooks/useKeyboardDismiss';

import {
  EMAIL_KEY,
  FIRST_NAME_KEY,
  LAST_NAME_KEY,
  PASSWORD_KEY,
  PHONE_KEY,
} from '../../fields';
import NextButton from '../../NextButton';
import getErrorMessage from './errorAdapter';
import { Props, Values } from './types';

const fields = [
  FIRST_NAME_KEY,
  LAST_NAME_KEY,
  EMAIL_KEY,
  PHONE_KEY,
  PASSWORD_KEY,
];

const SecondStepForm = ({
  handleSubmit,
  isRunning,
  error,
}: Props & FormikProps<Values>) => {
  const onPressSubmitButton = useKeyboardDismiss(handleSubmit);

  return (
    <>
      <FormikTextField
        autoFocus
        name={PASSWORD_KEY}
        onSubmitEditing={handleSubmit}
        placeholder={fbt(
          'Set password',
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

      <NextButton
        isRunning={isRunning}
        error={error}
        onPress={onPressSubmitButton}
      >
        <fbt desc="button text">Accept & continue</fbt>
      </NextButton>
    </>
  );
};

export default SecondStepForm;
