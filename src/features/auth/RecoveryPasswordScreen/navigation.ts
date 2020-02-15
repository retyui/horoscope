import { push } from '@/features/navigation';

import {
  RECOVER_PASSWORD_SCREEN_NAME_STEP2,
  RECOVER_PASSWORD_SCREEN_NAME_STEP3,
} from '../consts/screens';
import { CODE_KEY, RESEND_CODE_KEY, TOKEN_KEY } from './consts/params';

type Params = {
  token: string;
  resendToken: () => Promise<any>;
};

export const pushToConfirmationCodeStep = ({ resendToken, token }: Params) =>
  push(RECOVER_PASSWORD_SCREEN_NAME_STEP2, {
    params: {
      [RESEND_CODE_KEY]: resendToken,
      [TOKEN_KEY]: token,
    },
  });

export const pushToSetNewPassword = ({
  token,
  code,
}: {
  token: string;
  code: string;
}) =>
  push(RECOVER_PASSWORD_SCREEN_NAME_STEP3, {
    params: {
      [CODE_KEY]: code,
      [TOKEN_KEY]: token,
    },
  });
