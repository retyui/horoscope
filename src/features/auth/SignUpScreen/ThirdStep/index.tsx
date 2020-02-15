import { fbt } from 'fbt';
import React, { useCallback, useEffect } from 'react';

import DismissKeyboardView from '@/components/DismissKeyboardView';
import SafeAreaView from '@/components/SafeAreaView';
import TopBar from '@/components/TopBar';

import Container from '../Container';
import useSignUpFormValues from '../hooks/useSignUpFormValues';
import useVerifyPhone from '../hooks/useVerifyPhone';
import { goToFourthSignUpStep } from '../navigation';
import Form from './Form';
import { SubmitValues } from './Form/types';

const ThirdStep = () => {
  const setValues = useSignUpFormValues()[1];
  const [verifyPhone, isRunning, payload, error] = useVerifyPhone();
  const onSubmit = useCallback(
    (subValues: SubmitValues) => {
      setValues((values) => ({ ...values, ...subValues }));
      verifyPhone(subValues);
    },
    [setValues, verifyPhone],
  );

  useEffect(() => {
    if (payload) {
      goToFourthSignUpStep();
    }
  }, [payload]);

  return (
    <SafeAreaView>
      <DismissKeyboardView>
        <TopBar title={fbt('Phone', 'top bar title (sign up: step 3)')} />
        <Container>
          <Form error={error} isRunning={isRunning} onSubmit={onSubmit} />
        </Container>
      </DismissKeyboardView>
    </SafeAreaView>
  );
};

export default ThirdStep;
