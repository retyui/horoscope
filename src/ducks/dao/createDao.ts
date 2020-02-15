import { prop } from 'ramda';

import reducer from './reducer';
import selectors from './selectors';
import { IdPropGetterFn, Options } from './types';

const defaultOptions = {
  idProp: prop('id'),
};

const createDao = <
  Type extends string,
  Attrs extends {},
  IdType extends string | number
>(
  customOptions: Omit<Options<Type, Attrs>, 'idProp'> & {
    idProp?: IdPropGetterFn;
  },
) => {
  const options: Options<Type, Attrs> = {
    ...defaultOptions,
    ...customOptions,
  };

  return {
    reducer: reducer<Type, Attrs>(options),
    selectors: selectors<Type, Attrs, IdType>(options),
  };
};

export default createDao;
