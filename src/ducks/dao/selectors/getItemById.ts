/* eslint-disable no-console */
import { Options } from '../types';

const getItemById = <Type, Attrs, IdType>({
  getRoot,
}: Options<Type, Attrs>) => (state: any, id: IdType) => {
  const root = getRoot(state);
  // @ts-ignore
  const item = root[id];

  if (item) {
    return item;
  }

  /* istanbul ignore else */
  if (process.env.NODE_ENV !== 'production') {
    console.warn(`[getItemById]: Couldn't find item by id: '${id}'`);
  }

  return null;
};

export default getItemById;
