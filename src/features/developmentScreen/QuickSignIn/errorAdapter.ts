import { errorsMap as signInErrorsMap } from '@/features/auth/SignInScreen/Form/errorAdapter';
import { createErrorMessageExtractor } from '@/features/i18n/errors';

export default createErrorMessageExtractor({
  ...signInErrorsMap,
});
