import { Options } from './types';

const identity = (value: string): string => value;

export default (options?: Options<string>) => ({
  options,
  parse: identity,
  serialize: identity,
});
