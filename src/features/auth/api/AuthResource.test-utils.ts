import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import APIGateway from '@/api/APIGateway';
import Resource from '@/api/Resource';

import {
  RefreshRequest,
  RefreshResponse,
  SignInRequest,
  SignInResponse,
} from '../types';
import AuthResource from './AuthResource';

class TestResource extends Resource {
  getItems() {
    // @ts-ignore
    return this.doGet('/items').then(({ data }) => data);
  }
}

export const createApi = () => {
  const api = new AuthResource({ onTokensUpdate: () => {} });
  const itemsApi = new TestResource();
  const axiosInstance = axios.create();
  const mock = new MockAdapter(axiosInstance);
  const apiGateway = new APIGateway({ axiosInstance, host: '', headers: {} });

  api.setApiGateway(apiGateway);
  itemsApi.setApiGateway(apiGateway);

  return { mock, api, itemsApi };
};

export const mockRefreshEntryPoint = (
  mock: MockAdapter,
  req: RefreshRequest,
  tokens: RefreshResponse['data']['attributes'],
) =>
  mock
    .onPost('/auth/refresh', { data: req })
    .replyOnce(200, { data: { attributes: tokens } });

export const mockSignInEntryPoint = (
  mock: MockAdapter,
  req: SignInRequest,
  tokens: SignInResponse['data']['attributes'],
) =>
  mock
    .onPost('/auth/sign_in', { data: req })
    .reply(200, { data: { attributes: tokens } });

export const mockItemsEntryPoint = (mock: MockAdapter) =>
  mock.onGet('/items').reply(200, []);

export const isRefreshRequest = ({ url }: any) => url === '/auth/refresh';
