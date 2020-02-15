import { prop } from 'ramda';
import { Action } from 'redux-actions';

import { JsonApiResponse } from '@/types/jsonApi';

import { indexResources } from '../../actions';
import { IdPropOptions } from '../types';
import extractIds from './extractIds';
import responseToResourcesIndex from './responseToResourcesIndex';

export type Options<JsonApiMethod> = {
  dispatch: (action: Action<any>) => void;
  jsonApiMethod: JsonApiMethod;
} & Partial<IdPropOptions>;

const injectIndexResources = <
  Args extends Array<unknown>,
  JsonApiMethod extends (
    ...args: Args
  ) => Promise<JsonApiResponse<any, any>> = any
>({
  dispatch,
  jsonApiMethod,
  idProp = prop('id'),
}: Options<JsonApiMethod>) => (...args: Args) =>
  jsonApiMethod(...args).then((response: JsonApiResponse<any, any>) => {
    const resourcesIndex = responseToResourcesIndex(response, { idProp });

    dispatch(indexResources(resourcesIndex));

    return extractIds(response, { idProp });
  });

export default injectIndexResources;
