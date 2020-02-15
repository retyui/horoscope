import { AbstractGateway } from '@/api/types';

import api from './api';

const mockGateway = ({
  doPatch,
  doGet,
}: {
  doGet?: jest.Mock;
  doPatch?: jest.Mock;
}) => {
  // @ts-ignore
  const mockApiGateway: AbstractGateway = { doPatch, doGet };

  api.setApiGateway(mockApiGateway);

  return api;
};

it('should get user by id', async () => {
  const doGet = jest.fn().mockResolvedValueOnce({});

  mockGateway({ doGet });

  expect(doGet).toHaveBeenCalledTimes(0);

  await api.getCurrentUser();

  expect(doGet).toHaveBeenCalledTimes(1);
  expect(doGet).toHaveBeenCalledWith(`/profile`, undefined);
});

it('should update user by id', async () => {
  const doPatch = jest.fn().mockResolvedValueOnce({});

  mockGateway({ doPatch });

  expect(doPatch).toHaveBeenCalledTimes(0);

  const data = {
    current_password: '1',
    last_name: 'last_name',
  };

  await api.updateCurrentUser(data);

  expect(doPatch).toHaveBeenCalledTimes(1);
  expect(doPatch).toHaveBeenCalledWith(
    `/profile/update`,
    { data: { ...data } },
    undefined,
  );
});
