import { JsonApiResponse } from '@/types/jsonApi';

import { ResourcesIndex } from '../../actions';
import { IdPropOptions } from '../types';

declare function responseToResourcesIndex(
  response: JsonApiResponse<any, any>,
  options?: IdPropOptions,
): ResourcesIndex;

export default responseToResourcesIndex;
