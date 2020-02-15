import { useEffect } from 'react';

import { injectIndexResources } from '@/ducks/dao/jsonApi';
import useAsyncCallback from '@/hooks/useAsyncCallback';
import { useDispatch } from '@/redux/hooks';

import { organizationPasswordConfirmSuccess } from '../../actions';
import api from '../../api';
import { Values } from '../Form/types';

const useConfirmOrganizationPassword = (): [
  (values: Values) => void,
  boolean,
  Error | null,
] => {
  const dispatch = useDispatch();
  const [onSubmit, isRunning, payload, error] = useAsyncCallback(
    injectIndexResources<[Values]>({
      dispatch,
      jsonApiMethod: ({ password }: Values) =>
        api.confirmOrganizationPassword(password),
    }),
    [],
  );

  useEffect(() => {
    if (payload) {
      dispatch(organizationPasswordConfirmSuccess());
    }
  }, [payload, dispatch]);

  return [onSubmit, isRunning, error];
};

export default useConfirmOrganizationPassword;
