import { fbt } from 'fbt';

import { createErrorMessageExtractor } from '@/features/i18n/errors';

import { INVALID_CREDENTIALS, USER_NOT_FOUND } from './consts/errors';

export const errorsMap = {
  [USER_NOT_FOUND]: fbt(
    "We couldn't find your account. Sign up!",
    'sign in error message',
  ),
  [INVALID_CREDENTIALS]: fbt(
    'Incorrect email or password. Please try again.',
    'sign in error message',
  ),
};

export default createErrorMessageExtractor(errorsMap);
