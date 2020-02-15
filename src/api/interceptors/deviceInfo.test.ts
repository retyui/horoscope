import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import APIGateway from '@/api/APIGateway';
import Resource from '@/api/Resource';

import injectDeviceInfo from './deviceInfo';

jest.mock('react-native-device-info', () => ({
  getUniqueId: jest.fn().mockResolvedValue('getUniqueIdSync'),
  getModel: jest.fn().mockResolvedValue('getModelSync'),
  getVersion: jest.fn().mockResolvedValue('getVersionSync'),
  getBuildNumber: jest.fn().mockResolvedValue('getBuildNumberSync'),
  getDeviceName: jest.fn().mockResolvedValue('getDeviceNameSync'),
}));

class TestResource extends Resource {
  getItems(headers?: {}) {
    // @ts-ignore
    return this.doGet('/items', { headers }).then(({ data }) => data);
  }
}

const createApi = () => {
  const api = new TestResource();
  const axiosInstance = axios.create();
  const mock = new MockAdapter(axiosInstance);
  const apiGateway = new APIGateway({ axiosInstance, host: '', headers: {} });

  api.setApiGateway(apiGateway);
  apiGateway.useInterceptor({
    stage: 'request',
    onFulfilled: injectDeviceInfo,
  });

  return { mock, api };
};

it('should assign device info headers for each request', async () => {
  const { api, mock } = createApi();

  mock.onGet('/items').reply(200, []);

  await api.getItems();

  expect(mock.history.get.length).toBe(1);
  expect(mock.history.get[0].headers).toEqual(
    expect.objectContaining({
      'x-app-build-number': 'getBuildNumberSync',
      'x-app-version': 'getVersionSync',
      'x-device-id': 'getUniqueIdSync',
      'x-device-model': 'getModelSync',
      'x-device-name': 'getDeviceNameSync',
      // A default jest mock for Platform.OS is 'ios' value
      // https://github.com/facebook/react-native/blob/543420cf76e5826b474ad7242f037831979216f3/jest-preset.js#L14
      'x-operating-system': 'ios',
    }),
  );
});

it('should ignore overwriting reserved headers', async () => {
  const { api, mock } = createApi();

  mock.onGet('/items').reply(200, []);

  await api.getItems({
    'x-app-build-number': 'CUSTOM_HEADER_VALUE',
  });

  expect(mock.history.get.length).toBe(1);
  expect(mock.history.get[0].headers).toEqual(
    expect.objectContaining({
      'x-app-build-number': 'getBuildNumberSync',
    }),
  );
});
