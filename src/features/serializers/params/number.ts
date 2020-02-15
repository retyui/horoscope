import { Options } from './types';

export default (options?: Options<number>) => ({
  options,
  parse: (string: string) => Number(string),
  serialize: (number: number) => Number(number),
});
