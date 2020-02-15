import { isNil } from 'ramda';

import { SerializerDescriptor } from './types';

export default <T>(next: SerializerDescriptor<T>) => ({
  parse: (value?: any): T | null => (isNil(value) ? null : next.parse(value)),
  serialize: (value?: T | null): string | null =>
    isNil(value) ? null : next.serialize(value),
});
