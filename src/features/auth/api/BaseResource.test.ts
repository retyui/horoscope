import { AbstractGateway } from '@/api/types';

import BaseResource from './BaseResource';

const createApi = ({
  doDelete,
  doGet,
  doPost,
  doPatch,
}: {
  doPatch?: jest.Mock;
  doDelete?: jest.Mock;
  doGet?: jest.Mock;
  doPost?: jest.Mock;
}) => {
  const api = new BaseResource();

  // @ts-ignore
  const mockApiGateway: AbstractGateway = { doPatch, doDelete, doGet, doPost };

  api.setApiGateway(mockApiGateway);

  return api;
};

it('should make DELETE request to sign out endpoint without options', async () => {
  const doDelete = jest.fn().mockResolvedValueOnce({});

  const api = createApi({ doDelete });

  expect(doDelete).toHaveBeenCalledTimes(0);

  await api.logOut();

  expect(doDelete).toHaveBeenCalledTimes(1);
  expect(doDelete).toHaveBeenCalledWith('/auth/sign_out', undefined);
});

describe('verifyParams', () => {
  it('should make POST request with a email prop when call signUpVerifyEmail', async () => {
    const doPost = jest.fn().mockResolvedValueOnce({});

    const api = createApi({ doPost });

    expect(doPost).toHaveBeenCalledTimes(0);

    const email = 'a@a.co';

    await api.signUpVerifyEmail(email);

    expect(doPost).toHaveBeenCalledTimes(1);
    expect(doPost).toHaveBeenCalledWith(
      '/auth/verify_params',
      { data: { email } },
      undefined,
    );
  });

  it('should make POST request with a phone prop when call signUpVerifyPhone', async () => {
    const doPost = jest.fn().mockResolvedValueOnce({});

    const api = createApi({ doPost });

    expect(doPost).toHaveBeenCalledTimes(0);

    const phone = '123456789';

    await api.signUpVerifyPhone(phone);

    expect(doPost).toHaveBeenCalledTimes(1);
    expect(doPost).toHaveBeenCalledWith(
      '/auth/verify_params',
      { data: { phone } },
      undefined,
    );
  });
});

it('should make POST request with a email prop when call recoveryPassword', async () => {
  const doPost = jest.fn().mockResolvedValueOnce({});

  const api = createApi({ doPost });

  expect(doPost).toHaveBeenCalledTimes(0);

  const email = 'a@a.co';

  await api.recoveryPassword(email);

  expect(doPost).toHaveBeenCalledTimes(1);
  expect(doPost).toHaveBeenCalledWith(
    '/reset_passwords',
    { data: { email } },
    undefined,
  );
});

it('should make POST request with a email prop when call recoveryPassword', async () => {
  const doPost = jest.fn().mockResolvedValueOnce({});

  const api = createApi({ doPost });

  expect(doPost).toHaveBeenCalledTimes(0);

  const email = 'a@a.co';

  await api.recoveryPassword(email);

  expect(doPost).toHaveBeenCalledTimes(1);
  expect(doPost).toHaveBeenCalledWith(
    '/reset_passwords',
    { data: { email } },
    undefined,
  );
});

it('should make PATCH request when call confirmCode', async () => {
  const doPatch = jest.fn().mockResolvedValueOnce({});

  const api = createApi({ doPatch });

  expect(doPatch).toHaveBeenCalledTimes(0);

  const data = {
    code: 'phone',
    token: 'xxx',
  };

  await api.confirmCode(data);

  expect(doPatch).toHaveBeenCalledTimes(1);
  expect(doPatch).toHaveBeenCalledWith(
    `/reset_passwords/${data.token}`,
    { data: { token: data.code } },
    undefined,
  );
});

it('should make PATCH request when call updatePassword', async () => {
  const doPatch = jest.fn().mockResolvedValueOnce({});

  const api = createApi({ doPatch });

  expect(doPatch).toHaveBeenCalledTimes(0);

  const data = {
    password: '1234',
    code: 'phone',
    token: 'xxx',
  };

  await api.updatePassword(data);

  expect(doPatch).toHaveBeenCalledTimes(1);
  expect(doPatch).toHaveBeenCalledWith(
    `/reset_passwords/${data.token}`,
    { data: { token: data.code, password: data.password } },
    undefined,
  );
});
