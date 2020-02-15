import { call, put, take } from '@redux-saga/core/effects';

import { reduxAction, requestFailed, requestSuccess } from './actions';
import { createChannel } from './channel';
import createOfflineFallbackSaga from './index';

const options = { a: 1 };

const saga = createOfflineFallbackSaga(
  // @ts-ignore
  options,
);
const args = [1, '2', true];
const patternOrChannel: any = [];

patternOrChannel.close = () => {};

it('should create new channel', () => {
  const generator = saga(...args);

  expect(generator.next().value).toEqual(
    call(
      // @ts-ignore
      createChannel,
      options,
      args,
    ),
  );
});

it('then should wait events from channel', () => {
  const generator = saga(...args);

  generator.next();
  expect(generator.next(patternOrChannel).value).toEqual(
    take(patternOrChannel),
  );
});

it('should close channel and throw an error when was got an error action', () => {
  const generator = saga(...args);

  generator.next();
  generator.next(patternOrChannel);

  const error = new Error('123');

  expect(generator.next(requestFailed(error)).value).toEqual(
    call([patternOrChannel, patternOrChannel.close]),
  );

  try {
    generator.next();
  } catch (err) {
    expect(err).toBe(error);
  }
});

it('should close channel and return response when was got an success action', () => {
  const generator = saga(...args);

  generator.next();
  generator.next(patternOrChannel);

  const res = ['2', '3'];

  expect(generator.next(requestSuccess(res)).value).toEqual(
    call([patternOrChannel, patternOrChannel.close]),
  );

  expect(generator.next()).toEqual({
    done: true,
    value: res,
  });
});

it('should put actions and back to listening new events from channel when was got an redux action', () => {
  const generator = saga(...args);

  generator.next();
  generator.next(patternOrChannel);

  const action = { type: 'test/TEST' };

  expect(
    generator.next(
      reduxAction(
        // @ts-ignore
        action,
      ),
    ).value,
  ).toEqual(put(action));
  expect(generator.next().value).toEqual(take(patternOrChannel));
});

it('should ignore all unknown actions from channel', () => {
  const generator = saga(...args);

  generator.next();
  generator.next(patternOrChannel);

  const unknownAction = {};

  expect(generator.next(unknownAction).value).toEqual(take(patternOrChannel));
  expect(generator.next(unknownAction).value).toEqual(take(patternOrChannel));
});
