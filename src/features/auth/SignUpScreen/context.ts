import { createContext, Dispatch, SetStateAction } from 'react';

import { SignUpRequest } from '../types';

type UseStateReturn<S> = [S, Dispatch<SetStateAction<S>>];

export const signUpFormContext = createContext<
  UseStateReturn<Partial<SignUpRequest>>
>([{}, () => {}]);

export const { Provider: SignUpFormProvider } = signUpFormContext;
