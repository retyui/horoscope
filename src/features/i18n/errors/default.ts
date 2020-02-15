import { AxiosError } from 'axios';
import { fbt } from 'fbt';

import {
  isForbiddenError,
  isNetworkError,
  isNotFoundError,
  isSessionExpirationError,
} from '@/api/errors';

export const defaultErrors: Array<[
  (e: Error | AxiosError) => boolean,
  string,
]> = [
  [isNotFoundError, fbt('Not Found', 'network error message')],
  [
    isNetworkError,
    fbt('An unknown network error has occurred.', 'network error message'),
  ],

  [isForbiddenError, fbt("You don't have access", 'network error message')],
  [
    isSessionExpirationError,
    fbt('Need authorization', 'network error message'),
  ],
];
