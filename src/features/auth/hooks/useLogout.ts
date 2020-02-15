import { useCallback } from 'react';

import { deauthorize } from '@/features/auth/actions';
import { setAuthRoot } from '@/features/auth/navigation';
import { useDispatch } from '@/redux/hooks';

import askLogout from '../utils/askLogout';

const useLogout = () => {
  const dispatch = useDispatch();

  return useCallback(() => {
    askLogout().then((result) => {
      if (result === 'yes') {
        setAuthRoot();
        dispatch(deauthorize());
      }
    });
  }, [dispatch]);
};

export default useLogout;
