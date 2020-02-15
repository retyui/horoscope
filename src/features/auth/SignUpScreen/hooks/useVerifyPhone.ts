import useAsyncCallback from '@/hooks/useAsyncCallback';

import api from '../../api';
import { SubmitValues } from '../ThirdStep/Form/types';

const useVerifyPhone = () =>
  useAsyncCallback(
    ({ phone }: SubmitValues) => api.signUpVerifyPhone(phone),
    [],
  );

export default useVerifyPhone;
