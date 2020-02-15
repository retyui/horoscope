import { fbt } from 'fbt';
import { FormikProps } from 'formik';
import React from 'react';
import { View } from 'react-native';

import AsyncActionButton from '@/components/AsyncActionButton';
import FormikFieldErrorText from '@/components/FormikFieldErrorText';
import FormikTextField from '@/components/FormikTextField';
import useKeyboardDismiss from '@/hooks/useKeyboardDismiss';

import { PASSWORD_KEY } from './consts/fields';
import getErrorMessage from './errorAdapter';
import useStyles from './styles';
import { Props, Values } from './types';

const fields = [PASSWORD_KEY];

/*
 * This `View` wrapper need to fix bug on iOS (SafeAreaView + KeyboardAvoidingView)
 * When keyboard appear `<Text/>` jump without animation
 */
const ViewFixIos = View;

const OrganizationPasswordScreenForm = ({
  handleSubmit,
  isRunning,
  error,
}: Props & FormikProps<Values>) => {
  const styles = useStyles();
  const onPressSubmitButton = useKeyboardDismiss(handleSubmit);

  return (
    <>
      <FormikTextField
        secureTextEntry
        name={PASSWORD_KEY}
        placeholder={fbt('Password', 'password placeholder text').toString()}
        returnKeyType="done"
        onSubmitEditing={handleSubmit}
      />
      <ViewFixIos>
        <FormikFieldErrorText fields={fields} variant="afterTextField">
          {getErrorMessage(error)}
        </FormikFieldErrorText>
      </ViewFixIos>
      <AsyncActionButton
        error={error}
        isRunning={isRunning}
        style={styles.submitButton}
        onPress={onPressSubmitButton}
      >
        <fbt desc="button text">Continue</fbt>
      </AsyncActionButton>
    </>
  );
};

export default OrganizationPasswordScreenForm;
