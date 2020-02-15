import { fbt } from 'fbt';
import React, { useCallback } from 'react';

import DismissKeyboardView from '@/components/DismissKeyboardView';
import SafeAreaView from '@/components/SafeAreaView';
import Text from '@/components/Text';
import TopBar from '@/components/TopBar';
import { goBack } from '@/features/navigation';

import Container from '../Container';
import useSignUpFormValues from '../hooks/useSignUpFormValues';
import { goToSecondSignUpStep } from '../navigation';
import Form from './Form';
import { Values } from './Form/types';

const FirstStep = () => {
  const setValues = useSignUpFormValues()[1];
  const onSubmit = useCallback(
    (subValues: Values) => {
      setValues((values) => ({ ...values, ...subValues }));
      goToSecondSignUpStep();
    },
    [setValues],
  );

  return (
    <SafeAreaView>
      <DismissKeyboardView>
        <TopBar
          forceBackButton
          title={fbt('Your Name', 'top bar title (sign up: step 1)')}
        />
        <Container>
          <Form onSubmit={onSubmit} />

          <Text align="center" variant="caption" onPress={() => goBack()}>
            <fbt desc="go to sign in button text">
              Already have an account? Log in here
            </fbt>
          </Text>
        </Container>
      </DismissKeyboardView>
    </SafeAreaView>
  );
};

export default FirstStep;
