import { renderHook } from '@/testing/hooks';
import { createMockProvider, createMockReduxStore } from '@/testing/redux';

import useOfflineFallback from './useOfflineFallback';

it('should call redux store dispatch function', async () => {
  const dispatch = jest.fn();

  const { result } = renderHook(
    () =>
      useOfflineFallback({
        storageType: 'USER_TYPE',
        jsonApiMethod: jest.fn().mockResolvedValueOnce({}),
        storageMethod: jest.fn(),
      }),
    {
      WrapperComponent: createMockProvider(
        createMockReduxStore({
          dispatch,
        }),
      ),
    },
  );

  expect(dispatch).toHaveBeenCalledTimes(0);

  // @ts-ignore
  await result.current();

  expect(dispatch).toHaveBeenCalledTimes(1);
});
