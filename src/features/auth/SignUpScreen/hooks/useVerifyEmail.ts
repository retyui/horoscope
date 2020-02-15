import useAsyncCallback from '@/hooks/useAsyncCallback';

import api from '../../api';
import { Values } from '../SecondStep/Form/types';

const useVerifyEmail = () =>
  useAsyncCallback(({ email }: Values) => api.signUpVerifyEmail(email), []);

export default useVerifyEmail;
