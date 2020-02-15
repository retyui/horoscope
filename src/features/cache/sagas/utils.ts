import { __, indexBy, prop } from 'ramda';

import storages from '../storages';
import { AbstractStorage } from '../types';

const index = indexBy(prop('type'), storages);

export const getStorageByType: (
  type: string,
) => AbstractStorage<any> | undefined = prop(__, index);
