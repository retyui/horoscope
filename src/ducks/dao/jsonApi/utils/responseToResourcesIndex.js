import { defaultTo, fromPairs, map, omit, pipe, prop, toPairs } from 'ramda';

import toArray from './toArray';

const omitLinks = omit(['links']);

const extractRelationshipsId = (data, { idProp }) =>
  Array.isArray(data) ? data.map(idProp) : idProp(data);

const flattenRelationships = (relationships, { idProp }) =>
  pipe(
    defaultTo({}),
    toPairs,
    map(([key, val]) => [key, extractRelationshipsId(val.data, { idProp })]),
    fromPairs,
  )(relationships);

const flattenItem = (item, { idProp }) => {
  const { attributes, relationships, ...rest } = item;

  return {
    ...flattenRelationships(relationships, { idProp }),
    ...attributes,
    ...omitLinks(rest),
  };
};

const defaultOptions = { idProp: prop('id') };

const responseToResourcesIndex = (
  responseJsonApi,
  { idProp } = defaultOptions,
) => {
  const { data, included } = responseJsonApi;
  const items = [...toArray(data), ...toArray(included)];

  return items.reduce((acc, item) => {
    const { type, ...rest } = item;

    if (!acc[type]) {
      acc[type] = [];
    }

    acc[type].push(flattenItem(rest, { idProp }));

    return acc;
  }, {});
};

export default responseToResourcesIndex;
