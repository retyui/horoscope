import { identity, prop } from 'ramda';

import { isNetworkError } from '@/api/errors';
import { ItemId, JsonApiResponse } from '@/types/jsonApi';

import { indexResources, ResourcesIndex } from '../../actions';
import { extractIdsByData } from './extractIds';
import injectIndexResources, {
  Options as IndexResourcesOptions,
} from './injectIndexResources';

export type Options<JsonApiMethod> = IndexResourcesOptions<JsonApiMethod> & {
  shouldUseStorage?: (error: any) => boolean;
  storageMethod: () => Promise<ResourcesIndex | null>;
  storageType: string;
  onGetIds?: (ids: Array<ItemId>) => void;
};

const handlerOfflineRejects = <
  Args extends Array<unknown>,
  JsonApiMethod extends (...args: Args) => Promise<JsonApiResponse<any, any>>
>({
  dispatch,
  jsonApiMethod,
  storageMethod,
  storageType,
  onGetIds = identity,
  idProp = prop('id'),
  shouldUseStorage = isNetworkError,
}: Options<JsonApiMethod>) => {
  const apiMethod = injectIndexResources<Args, JsonApiMethod>({
    dispatch,
    jsonApiMethod,
    idProp,
  });

  return async (...args: Args) => {
    try {
      const itemsIds = await apiMethod(...args).then((ids) => {
        onGetIds(ids);

        return ids;
      });

      return itemsIds;
    } catch (error) {
      if (shouldUseStorage(error)) {
        const resourcesIndex = await storageMethod();

        if (resourcesIndex) {
          dispatch(indexResources(resourcesIndex));

          return extractIdsByData(resourcesIndex[storageType], { idProp });
        }
      }

      throw error;
    }
  };
};

export default handlerOfflineRejects;
