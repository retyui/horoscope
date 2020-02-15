import { useEffect } from 'react';

import useAsyncCallback from '@/hooks/useAsyncCallback';
import { useDispatch } from '@/redux/hooks';

import { authorize } from '../../actions';
import api from '../../api';
import { storeTokens } from '../../tokensStorage';
import { Values } from '../FourthStep/Form/types';

const useSignUp = () => {
  const dispatch = useDispatch();
  const value = useAsyncCallback((data: Values) => api.signUp(data), []);
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

export default useSignUp;
