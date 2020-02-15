import { Client } from 'rollbar-react-native';

import { getApplicationName } from '@/features/environment';

import { APPLICATION_NAME_KEY } from '../consts/extraParams';
import { Person } from '../types';
import { createSafeAsyncFunction, promisifyRollbarMethod } from './utils';

export const unSafeSetPerson = async (
  rollbar: Client,
  { id, name, email }: Person,
) => rollbar.setPerson(id, name, email);

export const unSafeClearPerson = async (rollbar: Client) =>
  rollbar.clearPerson();

export const unSafeTrackException = async (rollbar: Client, error: Error) => {
  const asyncError = promisifyRollbarMethod(rollbar, 'error');

  await asyncError(error, { [APPLICATION_NAME_KEY]: getApplicationName() });
};

export const setPerson = createSafeAsyncFunction(unSafeSetPerson);

export const clearPerson = createSafeAsyncFunction(unSafeClearPerson);

export const trackException = createSafeAsyncFunction(unSafeTrackException);
