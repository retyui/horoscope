import { fbt } from 'fbt';
import React, { useCallback, useEffect } from 'react';

import DismissKeyboardView from '@/components/DismissKeyboardView';
import SafeAreaView from '@/components/SafeAreaView';
import TopBar from '@/components/TopBar';

import Container from '../Container';
import useSignUpFormValues from '../hooks/useSignUpFormValues';
import useVerifyEmail from '../hooks/useVerifyEmail';
import { goToThirdSignUpStep } from '../navigation';
import Form from './Form';
import { Values } from './Form/types';

const SecondStep = () => {
  const setValues = useSignUpFormValues()[1];
  const [verifyEmail, isRunning, payload, error] = useVerifyEmail();
  const onSubmit = useCallback(
    (subValues: Values) => {
      setValues((values) => ({ ...values, ...subValues }));
      verifyEmail(subValues);
    },
    [setValues, verifyEmail],
  );

  useEffect(() => {
    if (payload) {
      goToThirdSignUpStep();
    }
  }, [payload]);

  return (
    <SafeAreaView>
      <DismissKeyboardView>
        <TopBar title={fbt('Email', 'top bar title (sign up: step 2)')} />
        <Container>
          <Form onSubmit={onSubmit} isRunning={isRunning} error={error} />
        </Container>
      </DismissKeyboardView>
    </SafeAreaView>
  );
};

export default SecondStep;
