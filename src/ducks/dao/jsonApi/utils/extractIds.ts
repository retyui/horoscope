import { JsonApiResponse } from '@/types/jsonApi';

import { IdPropOptions, JsonApiData } from '../types';
import toArray from './toArray';

export const extractIdsByData = (
  data: JsonApiData,
  { idProp }: IdPropOptions,
) => {
  const items = [...toArray(data)];

  return items.map(idProp);
};

const extractIds = (
  responseJsonApi: JsonApiResponse<any, any>,
  { idProp }: IdPropOptions,
) => {
  const { data } = responseJsonApi;

  return extractIdsByData(data, { idProp });
};

export default extractIds;
