import { Options, ReducerState } from '../types';

declare function indexResourcesReducer<Type, Attrs>(
  options: Options<Type, Attrs>,
): (state: ReducerState<Attrs>, action: any) => ReducerState<Attrs>;

export default indexResourcesReducer;
