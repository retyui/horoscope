import { SerializerDescriptor } from './types';

export default <T>(next: SerializerDescriptor<T>) => ({
  parse: (stringOrArray: string | Array<any>) =>
    (Array.isArray(stringOrArray)
      ? stringOrArray
      : stringOrArray.split(',')
    ).map((item) => next.parse(item)),
  serialize: (array: Array<T>) => array.map((item) => next.serialize(item)),
});
