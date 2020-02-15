import { Reducer } from 'redux';

import { RootState as _RootState } from '@/redux/types';

export type ReducersMapObjectType<
  T extends { [key: string]: Reducer<any, any> }
> = {
  [P in keyof T]: ReturnType<T[P]>;
};

export type RootState = _RootState;
