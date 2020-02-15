import { useContext } from 'react';

import { signUpFormContext } from '../context';

const useSignUpFormValues = () => useContext(signUpFormContext);

export default useSignUpFormValues;
