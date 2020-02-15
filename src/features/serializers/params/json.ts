import { Options } from './types';

export default (options?: Options<{}>) => ({
  options,
  parse: JSON.parse,
  serialize: JSON.stringify,
});
