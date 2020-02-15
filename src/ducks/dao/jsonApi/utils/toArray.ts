import { defaultTo, identity, ifElse, pipe } from 'ramda';

import { JsonApiData } from '../types';

const toArray: (data: JsonApiData) => Array<{}> = pipe(
  defaultTo([]),
  ifElse(Array.isArray, identity, (item) => [item]),
);

export default toArray;
