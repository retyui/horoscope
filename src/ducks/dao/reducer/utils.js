import { indexBy, map, mergeRight, pipe } from 'ramda';

export const createMerger = ({ idProp, mapperFn }) => (state, items) =>
  pipe(indexBy(idProp), map(mapperFn), mergeRight(state))(items);
