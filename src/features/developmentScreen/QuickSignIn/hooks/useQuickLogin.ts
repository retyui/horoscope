import { path } from 'ramda';
import { useEffect } from 'react';

import { authorize } from '@/features/auth/actions';
import api from '@/features/auth/api';
import { storeTokens } from '@/features/auth/tokensStorage';
import useAsyncCallback from '@/hooks/useAsyncCallback';
import { useDispatch } from '@/redux/hooks';

type Credentials = {
  email: string;
  password: string;
};

const signInOrSignUpIfNeed = (data: Credentials) =>
  api.authenticate(data).catch((error) => {
    const apiError = path<{ status: string }>(
      ['response', 'data', 'errors', 0],
      error,
    );

    if (apiError && apiError.status === 'not_found') {
      return api.signUp({
        ...data,
        last_name: 'Auto created account',
        first_name: 'Auto created account',
        phone: '12312312312',
      });
    }

    return Promise.reject(error);
  });

const useQuickLogin = () => {
  const dispatch = useDispatch();
  const value = useAsyncCallback(signInOrSignUpIfNeed, []);
  const authTokens = value[2];

  useEffect(() => {
    if (authTokens) {
      storeTokens(authTokens).then(() => {
        dispatch(authorize());
      });
    }
  }, [dispatch, authTokens]);

  return value;
};

export default useQuickLogin;
