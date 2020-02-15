import { fbt } from 'fbt';
import { FormikProps } from 'formik';
import React from 'react';

import FormikFieldErrorText from '@/components/FormikFieldErrorText';
import FormikTextField from '@/components/FormikTextField';
import useKeyboardDismiss from '@/hooks/useKeyboardDismiss';
import useOnSubmitEditing from '@/hooks/useOnSubmitEditing';

import { FIRST_NAME_KEY, LAST_NAME_KEY } from '../../fields';
import NextButton from '../../NextButton';
import { Props, Values } from './types';

const fields = [FIRST_NAME_KEY, LAST_NAME_KEY];

const FirstStepForm = ({ handleSubmit }: Props & FormikProps<Values>) => {
  const onPressSubmitButton = useKeyboardDismiss(handleSubmit);
  const [lastNameFieldRef, focusLastNameField] = useOnSubmitEditing();

  return (
    <>
      <FormikTextField
        autoFocus
        name={FIRST_NAME_KEY}
        placeholder={fbt(
          'First name',
          'first name field placeholder text',
        ).toString()}
        returnKeyType="next"
        onSubmitEditing={focusLastNameField}
        // iOS
        textContentType="name"
        // Android
        autoCompleteType="name"
      />
      <FormikTextField
        ref={lastNameFieldRef}
        name={LAST_NAME_KEY}
        placeholder={fbt(
          'Last name',
          'last name field placeholder text',
        ).toString()}
        returnKeyType="done"
        onSubmitEditing={handleSubmit}
        // iOS
        textContentType="familyName"
      />
      <FormikFieldErrorText fields={fields} variant="afterTextField" />

      <NextButton error={null} isRunning={false} onPress={onPressSubmitButton}>
        <fbt desc="button text">Continue</fbt>
      </NextButton>
    </>
  );
};

export default FirstStepForm;
