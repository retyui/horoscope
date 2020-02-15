import { fbt } from 'fbt';

import { createErrorMessageExtractor } from '@/features/i18n/errors';

import { ALREADY_USED_EMAIL, INVALID_EMAIL } from './consts/errors';

export const errorsMap = {
  [INVALID_EMAIL]: fbt(
    'Please enter a valid email address',
    'sign up (step 2) invalid email',
  ),
  [ALREADY_USED_EMAIL]: fbt(
    'This email address is already in use. You can reset your password, or sign up for a new account!',
    'sign up (step 2) need other email',
  ),
};

export default createErrorMessageExtractor(errorsMap);
