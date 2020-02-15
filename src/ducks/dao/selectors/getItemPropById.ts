import { pipe } from 'ramda';

import { Options } from '../types';
import createGetItemById from './getItemById';
import { prop } from './utils';

const getItemPropById = <Type, Attrs, IdType>(
  options: Options<Type, Attrs>,
) => {
  const getItemById = createGetItemById<Type, Attrs, IdType>(options);

  return <Prop extends keyof Attrs, State extends {}>(
    key: Prop,
  ): ((state: State, id: IdType) => Attrs[Prop]) =>
    pipe(
      getItemById,
      // @ts-ignore
      prop(key),
    );
};

export default getItemPropById;
