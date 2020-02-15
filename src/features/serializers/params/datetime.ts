import { Options } from './types';

export default (options?: Options<boolean>) => ({
  options,
  parse: (string: string) => new Date(string),
  serialize: (date: Date) => date.toISOString(),
});
