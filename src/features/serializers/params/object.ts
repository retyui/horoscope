import { mapObjIndexed } from 'ramda';

import { SerializerDescriptor } from './types';

export default <
  Ant extends { [key: string]: SerializerDescriptor<any> },
  Keys extends keyof Ant
>(
  annotations: Ant,
) => {
  const parse = <Key extends Keys>(value: any, key: Key): Ant[Key] => {
    const annotation = annotations[key];

    if (annotation) {
      return annotation.parse(value);
    }

    return value;
  };

  const serialize = <Key extends Keys>(value: Ant[Key], key: Key): any => {
    const annotation = annotations[key];

    if (annotation) {
      return annotation.serialize(value);
    }

    return value;
  };

  return {
    parse: mapObjIndexed(
      // @ts-ignore
      parse,
    ),
    serialize: mapObjIndexed(
      // @ts-ignore
      serialize,
    ),
  };
};
