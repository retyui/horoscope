import { Options } from './types';

const mapping = {
  false: false,
  true: true,
};

export default (options?: Options<boolean>) => ({
  options,
  parse: (string: string | boolean): boolean =>
    // @ts-ignore
    mapping[string],
  serialize: (payload: boolean): boolean => payload,
});
