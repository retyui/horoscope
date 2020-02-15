import { AxiosError } from 'axios';
import { fbt } from 'fbt';

import { getReasonCode } from '@/api/errors';

import { defaultErrors } from './default';

type ErrorsMap = { [reasonCode: string]: string };

export const getErrorMessage = (error: Error | AxiosError): string => {
  for (const [checkError, message] of defaultErrors) {
    if (checkError(error)) {
      return message;
    }
  }

  return fbt(
    'Your request cannot be processed at this time. Try again and if you continue to have these issues, contact support@glossgenius.com.',
    'unknown error message',
  );
};

export const createErrorMessageExtractor = (errorsMap: ErrorsMap) => (
  error?: null | Error | AxiosError,
): null | string => {
  if (!error) {
    return null;
  }

  const code = getReasonCode(error);

  if (code && errorsMap[code]) {
    return errorsMap[code];
  }

  return getErrorMessage(error);
};
