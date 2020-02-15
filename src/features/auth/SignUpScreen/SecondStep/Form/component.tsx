import { fbt } from 'fbt';
import { FormikProps } from 'formik';
import React from 'react';

import FormikFieldErrorText from '@/components/FormikFieldErrorText';
import FormikTextField from '@/components/FormikTextField';
import useKeyboardDismiss from '@/hooks/useKeyboardDismiss';

import { EMAIL_KEY } from '../../fields';
import NextButton from '../../NextButton';
import getErrorMessage from './errorAdapter';
import { Props, Values } from './types';

const fields = [EMAIL_KEY];

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
        noLeftRightSpaces
        name={EMAIL_KEY}
        autoCapitalize="none"
        placeholder={fbt(
          'Your email',
          'email field placeholder text',
        ).toString()}
        returnKeyType="done"
        onSubmitEditing={handleSubmit}
        keyboardType="email-address"
        // iOS
        textContentType="emailAddress"
        // Android
        autoCompleteType="email"
      />
      <FormikFieldErrorText fields={fields} variant="afterTextField">
        {getErrorMessage(error)}
      </FormikFieldErrorText>

      <NextButton
        isRunning={isRunning}
        error={error}
        onPress={onPressSubmitButton}
      >
        <fbt desc="button text">Continue</fbt>
      </NextButton>
    </>
  );
};

export default SecondStepForm;
