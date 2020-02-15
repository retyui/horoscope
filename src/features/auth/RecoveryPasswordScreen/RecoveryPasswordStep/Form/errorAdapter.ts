import { fbt } from 'fbt';

import { createErrorMessageExtractor } from '@/features/i18n/errors';

import { USER_NOT_FOUND } from './consts/errors';

export const errorsMap = {
  [USER_NOT_FOUND]: fbt(
    "We couldn't find an account under that email address.",
    'user not found by email error message on recovery password form',
  ),
};

export default createErrorMessageExtractor(errorsMap);
