import { Options } from '../types';
import getItemById from './getItemById';
import getItemPropById from './getItemPropById';
import isItemLoaded from './isItemLoaded';

const selectors = <Type, Attrs, IdType>(options: Options<Type, Attrs>) => ({
  getItemPropById: getItemPropById<Type, Attrs, IdType>(options),
  getItemById: getItemById<Type, Attrs, IdType>(options),
  isItemLoaded: isItemLoaded<Type, Attrs, IdType>(options),
});

export default selectors;
