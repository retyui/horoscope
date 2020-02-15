import { isEmpty, isNil, prop } from 'ramda';

import { createMerger } from './utils';

const indexResourcesReducer = ({ type, idProp }) => {
  const mapperFn = (item) => ({ ...item, id: idProp(item) });
  const mergeItems = createMerger({ idProp, mapperFn });
  const reducer = (state, action) => {
    const { payload } = action;
    const items = prop(type, payload);

    if (isNil(items) || isEmpty(items)) {
      return state;
    }

    return mergeItems(state, items);
  };

  return reducer;
};

export default indexResourcesReducer;
