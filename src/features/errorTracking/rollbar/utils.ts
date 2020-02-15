import { Client, Extra, LogArgument } from 'rollbar-react-native';

import { createSafeAsyncFunction as baseCreateSafeAsyncFunction } from '../utils';
import { createInstance } from './rollbar';

export const createSafeAsyncFunction = <Args extends Array<any>>(
  fn: (rollbar: Client, ...args: Args) => Promise<void>,
) =>
  baseCreateSafeAsyncFunction(async (...args: Args) => {
    const rollbar = createInstance();

    if (rollbar) {
      await fn(rollbar, ...args);
    }
  });

type LegacyMethods =
  | 'log'
  | 'debug'
  | 'info'
  | 'warning'
  | 'error'
  | 'critical';

export const promisifyRollbarMethod = <MethodName extends LegacyMethods>(
  rollbar: Client,
  methodName: MethodName,
) => (logArg: LogArgument, extra: Extra) =>
  new Promise<void>((resolve, reject) => {
    rollbar[methodName](logArg, extra, (err) => {
      if (err) {
        reject(err);
      }

      resolve();
    });
  });
