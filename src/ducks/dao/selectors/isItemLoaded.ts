import { Options } from '../types';

const isItemLoaded = <Type, Attrs, IdType>({
  getRoot,
}: Options<Type, Attrs>) => {
  return (state: any, id: IdType) => {
    const root = getRoot(state);

    return Boolean(
      // @ts-ignore
      root[id],
    );
  };
};

export default isItemLoaded;
