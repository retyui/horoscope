import React, { ComponentType, useState } from 'react';

import { SignUpRequest } from '../types';
import { SignUpFormProvider } from './context';

const withFormProvider = (StackNavigator: ComponentType<any>) => {
  const WithFormProvider = (props: {}) => {
    const state = useState<Partial<SignUpRequest>>({});

    return (
      <SignUpFormProvider value={state}>
        <StackNavigator {...props} />
      </SignUpFormProvider>
    );
  };

  // @ts-ignore
  WithFormProvider.router = StackNavigator.router;

  return WithFormProvider;
};

export default withFormProvider;
