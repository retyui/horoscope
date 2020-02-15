import { END } from 'redux-saga';

import { indexResources } from '@/ducks/dao/actions';

import { reduxAction, requestFailed, requestSuccess } from './actions';
import { createChannel } from './channel';

const mockChannel = (options: any) => {
  const take = (ch: any) => new Promise((res) => ch.take(res));
  const ch = createChannel(options, []);

  return { take: () => take(ch) };
};

it('should return redux,success actions and close channel', async () => {
  const { take } = mockChannel({
    jsonApiMethod: jest.fn().mockResolvedValueOnce({ data: [] }),
  });
  const action = await take();

  expect(action).toEqual(reduxAction(indexResources({})));

  const result = await take();

  expect(result).toEqual(requestSuccess([]));

  expect(await take()).toEqual(END);
});

it('should return error actions and close channel', async () => {
  const error = new Error('error');
  const { take } = mockChannel({
    jsonApiMethod: jest.fn().mockRejectedValueOnce(error),
  });

  expect(await take()).toEqual(requestFailed(error));
  expect(await take()).toEqual(END);
});
