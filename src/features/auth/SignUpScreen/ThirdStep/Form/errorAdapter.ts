import { fbt } from 'fbt';

import { createErrorMessageExtractor } from '@/features/i18n/errors';

import { INVALID_PHONE } from './consts/errors';

export const errorsMap = {
  [INVALID_PHONE]: fbt(
    'Please confirm that phone number is correct.',
    'sign up (step 3) invalid phone',
  ),
};

export default createErrorMessageExtractor(errorsMap);
