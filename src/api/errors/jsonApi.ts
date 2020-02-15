import { AxiosError } from 'axios';
import { isEmpty, isNil, path } from 'ramda';

import { JsonApiError } from '@/types/jsonApi';

const getAttributeName = (error: JsonApiError): string => {
  const pointer = path<string>(['source', 'pointer'], error);

  if (pointer) {
    return pointer.replace('/data/attributes/', '');
  }

  return '';
};

export const formatReasonCode = (code: string, attributeName: string) =>
  `${code}:${attributeName}`;

export const formatInvalidReason = (attributeName: string) =>
  formatReasonCode('invalid', attributeName);

export const formatTakenEmailReason = (attributeName: string) =>
  formatReasonCode('taken', attributeName);

export const getReasonCode = (
  axiosError: Error | AxiosError,
): string | null => {
  const error = path<JsonApiError>(
    ['response', 'data', 'errors', 0],
    axiosError,
  );

  if (isNil(error) || isEmpty(error)) {
    return null;
  }

  const { code } = error;

  if (code) {
    const attributeName = getAttributeName(error);

    if (attributeName) {
      return formatReasonCode(code, attributeName);
    }

    return code;
  }

  return null;
};
