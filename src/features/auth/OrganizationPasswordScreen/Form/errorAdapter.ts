import { fbt } from 'fbt';

import { createErrorMessageExtractor } from '@/features/i18n/errors';

import { INCORRECT_PASSWORD } from './consts/errors';

export const errorsMap = {
  [INCORRECT_PASSWORD]: fbt(
    'That organization password is incorrect. Please try again!',
    'organization password is incorrect error message text',
  ),
};

export default createErrorMessageExtractor(errorsMap);
