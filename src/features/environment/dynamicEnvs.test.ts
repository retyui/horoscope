import { mockAsyncStorageMethod } from '@/testing/asyncStorage';

import {
  getEnvs,
  restoreStoredEnvs,
  subscribeOnUpdateEnvs,
  updateEnvs,
} from './dynamicEnvs';

describe('getEnvs', () => {
  it('should work properly', () => {
    getEnvs();
  });
});

describe('subscribeOnUpdateEnvs', () => {
  it('should work properly', () => {
    const unsubscribeFn = subscribeOnUpdateEnvs(() => {});

    expect(unsubscribeFn).toEqual(expect.any(Function));

    unsubscribeFn();
  });
});

describe('updateEnvs', () => {
  it('should work properly', async () => {
    const applicationName = '1';
    const platformApiUrl = '2';
    const setItem = jest.fn().mockResolvedValueOnce(null);
    const unMock = mockAsyncStorageMethod('setItem', setItem);

    await updateEnvs({
      applicationName,
      platformApiUrl,
    });

    expect(setItem).toHaveBeenCalledWith(
      'DYNAMIC_APPLICATION_ENVS',
      '{"applicationName":"1","platformApiUrl":"2"}',
    );

    unMock();
  });
});

describe('restoreStoredEnvs', () => {
  it('should work properly', async () => {
    const getItem = jest
      .fn()
      .mockResolvedValueOnce('{"applicationName":"6","platformApiUrl":"9"}');
    const unMock = mockAsyncStorageMethod('getItem', getItem);

    await restoreStoredEnvs();

    unMock();
  });
});
