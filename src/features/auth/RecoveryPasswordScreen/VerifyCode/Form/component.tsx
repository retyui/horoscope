import { fbt } from 'fbt';
import { FormikProps } from 'formik';
import React from 'react';

import AsyncActionButton from '@/components/AsyncActionButton';
import FormikFieldErrorText from '@/components/FormikFieldErrorText';
import useKeyboardDismiss from '@/hooks/useKeyboardDismiss';

import CodeFiled from '../CodeField';
import getErrorMessage from './errorAdapter';
import { CODE_KEY } from './fields';
import useStyles from './styles';
import { Props, Values } from './types';

const fields = [CODE_KEY];

const ConfirmationCodeForm = ({
  handleSubmit,
  isRunning,
  error,
}: Props & FormikProps<Values>) => {
  const styles = useStyles();
  const onPressSubmitButton = useKeyboardDismiss(handleSubmit);

  return (
    <>
      <CodeFiled
        autoFocus
        name={CODE_KEY}
        returnKeyType="done"
        onSubmitEditing={onPressSubmitButton}
      />

      <FormikFieldErrorText fields={fields}>
        {getErrorMessage(error)}
      </FormikFieldErrorText>

      <AsyncActionButton
        style={styles.submitButton}
        error={error}
        isRunning={isRunning}
        onPress={onPressSubmitButton}
      >
        <fbt desc="button text">Reset password</fbt>
      </AsyncActionButton>
    </>
  );
};

export default ConfirmationCodeForm;
