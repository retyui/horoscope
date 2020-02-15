/* eslint-disable consistent-return,no-console */
import { spawn } from 'redux-saga/effects';

import * as Crashlytics from './crashlytics';
import * as Rollbar from './rollbar';

const joinFn = <Args extends Array<any>, Return>(
  functions: Array<(...a: Args) => Return>,
) => {
  return (...args: Args) => functions.forEach((fn) => fn(...args));
};

export const setPerson = joinFn([Rollbar.setPerson, Crashlytics.setPerson]);

export const clearPerson = joinFn([
  Rollbar.clearPerson,
  Crashlytics.clearPerson,
]);

export const trackException = (error: Error) => {
  /* istanbul ignore next */
  if (process.env.NODE_ENV === 'development') {
    return console.warn(`Unexpected error ${error}`);
  }

  Rollbar.trackException(error);
  Crashlytics.trackException(error);
};

export const createErrorBoundary = <Args extends Array<any>>(
  fn: (...a: Args) => any,
) => (...args: Args) => {
  try {
    fn(...args);
  } catch (error) {
    trackException(error);
  }
};

export const createErrorBoundaryAsync = <Args extends Array<any>>(
  fn: (...a: Args) => Promise<any>,
) => async (...args: Args): Promise<void> => {
  try {
    await fn(...args);
  } catch (error) {
    trackException(error);
  }
};

export function createSagaErrorBoundary<Args extends Array<any>>(
  saga: (...a: Args) => Generator<any, any>,
) {
  return function* errorBoundary(...args: Args) {
    try {
      yield* saga(...args);
    } catch (error) {
      yield spawn(trackException, error);
    }
  };
}
