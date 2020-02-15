import { createErrorMessageExtractor } from '@/features/i18n/errors';

import { errorsMap as emailErrorsMap } from '../../SecondStep/Form/errorAdapter';
import { errorsMap as phoneErrorsMap } from '../../ThirdStep/Form/errorAdapter';

export const errorsMap = {
  ...emailErrorsMap,
  ...phoneErrorsMap,
};

export default createErrorMessageExtractor(errorsMap);
