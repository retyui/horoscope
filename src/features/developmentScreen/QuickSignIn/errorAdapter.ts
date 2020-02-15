import { errorsMap as signInErrorsMap } from '@/features/auth/SignInScreen/Form/errorAdapter';
import { errorsMap as signUpErrorsMap } from '@/features/auth/SignUpScreen/FourthStep/Form/errorAdapter';
import { createErrorMessageExtractor } from '@/features/i18n/errors';

export default createErrorMessageExtractor({
  ...signInErrorsMap,
  ...signUpErrorsMap,
});
