import { useDispatch } from '@/redux/hooks';
import { JsonApiResponse } from '@/types/jsonApi';

import handlerOfflineRejects, { Options } from '../utils/handlerOfflineRejects';

export const useOfflineFallback = <
  Args extends Array<unknown>,
  JsonApiMethod extends (
    ...args: Args
  ) => Promise<JsonApiResponse<any, any>> = any
>(
  options: Omit<Options<JsonApiMethod>, 'dispatch'>,
) => {
  const dispatch = useDispatch();

  return handlerOfflineRejects<Args, JsonApiMethod>({
    ...options,
    dispatch,
  });
};

export default useOfflineFallback;
