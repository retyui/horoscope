import { useDispatch } from '@/redux/hooks';
import { JsonApiResponse } from '@/types/jsonApi';

import injectIndexResources, { Options } from '../utils/injectIndexResources';

export const useApiMethod = <
  Args extends Array<unknown>,
  JsonApiMethod extends (
    ...args: Args
  ) => Promise<JsonApiResponse<any, any>> = any
>(
  options: Omit<Options<JsonApiMethod>, 'dispatch'>,
) => {
  const dispatch = useDispatch();

  return injectIndexResources<Args, JsonApiMethod>({
    ...options,
    dispatch,
  });
};

export default useApiMethod;
