import {
  createApi,
  isRefreshRequest,
  mockItemsEntryPoint,
  mockRefreshEntryPoint,
  mockSignInEntryPoint,
} from './AuthResource.test-utils';

it('should captures token information after success login', async () => {
  const { api, mock, itemsApi } = createApi();

  const LOGIN_REQUEST = { email: 'login', password: 'password' };
  const LOGIN_RESPONSE = {
    access_token: 'TOKEN',
    refresh_token: 'REFRESH_TOKEN',
  };

  mockSignInEntryPoint(mock, LOGIN_REQUEST, LOGIN_RESPONSE);
  mockItemsEntryPoint(mock);

  await api.authenticate(LOGIN_REQUEST);
  await itemsApi.getItems();

  expect(mock.history.get.length).toBe(1);
  expect(mock.history.get[0].headers.Authorization).toBe(
    `Bearer ${LOGIN_RESPONSE.access_token}`,
  );
});

it('should clear token information when sign out', async () => {
  const { api, mock, itemsApi } = createApi();

  const LOGIN_REQUEST = { email: 'login', password: 'password' };
  const LOGIN_RESPONSE = {
    access_token: 'TOKEN',
    refresh_token: 'REFRESH_TOKEN',
  };

  mockSignInEntryPoint(mock, LOGIN_REQUEST, LOGIN_RESPONSE);
  mock.onDelete('/auth/sign_out').reply(200, {});
  mockItemsEntryPoint(mock);

  await api.authenticate(LOGIN_REQUEST);
  await api.logOut();
  await itemsApi.getItems();

  expect(mock.history.get.length).toBe(1);
  expect(mock.history.delete.length).toBe(1);
  expect(mock.history.get[0].headers.Authorization).toBeFalsy();
});

it('should correctly retries request when got 401 with new token', async () => {
  const { api, mock, itemsApi } = createApi();

  const LOGIN_REQUEST = { email: 'login', password: 'password' };
  const LOGIN_RESPONSE = {
    access_token: 'TOKEN',
    refresh_token: 'REFRESH_TOKEN',
  };
  const REFRESH_REQUEST = { refresh_token: LOGIN_RESPONSE.refresh_token };
  const REFRESH_RESPONSE = {
    access_token: 'TOKEN2',
    refresh_token: 'REFRESH_TOKEN2',
  };

  mockSignInEntryPoint(mock, LOGIN_REQUEST, LOGIN_RESPONSE);
  mockRefreshEntryPoint(mock, REFRESH_REQUEST, REFRESH_RESPONSE);
  mock.onGet('/items').reply((config) => {
    const { Authorization } = config.headers;

    if (Authorization === `Bearer ${LOGIN_RESPONSE.access_token}`) {
      return [401];
    }
    if (Authorization === `Bearer ${REFRESH_RESPONSE.access_token}`) {
      return [200, []];
    }

    return [404];
  });

  await api.authenticate(LOGIN_REQUEST);
  await itemsApi.getItems();

  expect(mock.history.get.length).toBe(2);
  expect(mock.history.get[1].headers.Authorization).toBe(
    `Bearer ${REFRESH_RESPONSE.access_token}`,
  );
});

it('should correctly fails request when got non 401 error', async () => {
  const { mock, itemsApi } = createApi();

  mock.onGet('/items').reply(404);

  await expect(itemsApi.getItems()).rejects.toThrow('404');
});

describe('refreshToken', () => {
  const { api, mock, itemsApi } = createApi();
  const REFRESH_RESPONSE = {
    access_token: 'TOKEN2',
    refresh_token: 'REFRESH_TOKEN2',
  };

  it("shouldn't not consumes token more than once", async () => {
    const LOGIN_REQUEST = { email: 'login', password: 'password' };
    const LOGIN_RESPONSE = {
      access_token: 'TOKEN',
      refresh_token: 'REFRESH_TOKEN',
    };
    const REFRESH_REQUEST = { refresh_token: LOGIN_RESPONSE.refresh_token };

    mockSignInEntryPoint(mock, LOGIN_REQUEST, LOGIN_RESPONSE);
    mockRefreshEntryPoint(mock, REFRESH_REQUEST, REFRESH_RESPONSE);

    mock.onGet('/items').reply((config) => {
      const { Authorization } = config.headers;

      if (Authorization === `Bearer ${LOGIN_RESPONSE.access_token}`) {
        return [401];
      }
      if (Authorization === `Bearer ${REFRESH_RESPONSE.access_token}`) {
        return [200, []];
      }

      return [404];
    });

    await api.authenticate(LOGIN_REQUEST);
    await Promise.all([
      itemsApi.getItems(),
      itemsApi.getItems(),
      itemsApi.getItems(),
    ]);

    expect(mock.history.post.filter(isRefreshRequest).length).toBe(1);
  });

  it('should clear previous request', async () => {
    const REFRESH_REQUEST_NEXT = {
      refresh_token: REFRESH_RESPONSE.refresh_token,
    };
    const REFRESH_RESPONSE_NEXT = {
      access_token: 'TOKEN3',
      refresh_token: 'REFRESH_TOKEN3',
    };

    mockRefreshEntryPoint(mock, REFRESH_REQUEST_NEXT, REFRESH_RESPONSE_NEXT);

    mock.onGet('/items').reply((config) => {
      const { Authorization } = config.headers;

      if (Authorization === `Bearer ${REFRESH_RESPONSE.access_token}`) {
        return [401];
      }
      if (Authorization === `Bearer ${REFRESH_RESPONSE_NEXT.access_token}`) {
        return [200, []];
      }

      return [404];
    });

    await Promise.all([itemsApi.getItems(), itemsApi.getItems()]);

    expect(mock.history.post.filter(isRefreshRequest).length).toBe(2);
  });
});
