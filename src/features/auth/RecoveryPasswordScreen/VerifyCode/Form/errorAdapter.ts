import { fbt } from 'fbt';

import { createErrorMessageExtractor } from '@/features/i18n/errors';

export const errorsMap = {
  invalid_token: fbt('This code is not valid or expired', 'error message'),
};

export default createErrorMessageExtractor(errorsMap);
