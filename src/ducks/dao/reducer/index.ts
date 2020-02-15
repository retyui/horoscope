import { Reducer } from 'redux';
import { handleActions } from 'redux-actions';

import { INDEX_RESOURCES } from '../actionTypes';
import { Options, ReducerState } from '../types';
import indexResourcesReducer from './indexResourcesReducer';

const byId = <Type, Attrs>(
  options: Options<Type, Attrs>,
): Reducer<ReducerState<Attrs>, any> =>
  handleActions(
    {
      [INDEX_RESOURCES]: indexResourcesReducer<Type, Attrs>(options),
    },
    {},
  );

export default byId;
