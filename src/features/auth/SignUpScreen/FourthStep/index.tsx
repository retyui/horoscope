import { fbt } from 'fbt';
import React from 'react';

import DismissKeyboardView from '@/components/DismissKeyboardView';
import SafeAreaView from '@/components/SafeAreaView';
import TopBar from '@/components/TopBar';

import Container from '../Container';
import useSignUp from '../hooks/useSignUp';
import useSignUpFormValues from '../hooks/useSignUpFormValues';
import Form from './Form';

const FourthStep = () => {
  const [values] = useSignUpFormValues();
  const [onSubmit, isRunning, , error] = useSignUp();

  return (
    <SafeAreaView>
      <DismissKeyboardView>
        <TopBar title={fbt('Password', 'top bar title (sign up: step 4)')} />
        <Container>
          <Form
            initialEmail={values.email}
            initialFirstName={values.first_name}
            initialLastName={values.last_name}
            initialPhone={values.phone}
            onSubmit={onSubmit}
            isRunning={isRunning}
            error={error}
          />
        </Container>
      </DismissKeyboardView>
    </SafeAreaView>
  );
};

export default FourthStep;
