import { call, put, take } from 'redux-saga/effects';

import { JsonApiResponse } from '@/types/jsonApi';

import { Options } from '../../utils/handlerOfflineRejects';
import { ERROR_TYPE, REDUX_ACTION_TYPE, SUCCESS_TYPE } from './actionTypes';
import { ChannelActions, createChannel } from './channel';

export const createOfflineFallbackSaga = <
  Args extends Array<unknown>,
  JsonApiMethod extends (...args: Args) => Promise<JsonApiResponse<any, any>>
>(
  options: Omit<Options<JsonApiMethod>, 'dispatch'>,
) =>
  function* offlineFallbackSaga(...args: Args) {
    const channel: ReturnType<typeof createChannel> = yield call(
      createChannel,
      options,
      args,
    );

    try {
      while (true) {
        const action: ChannelActions = yield take<ChannelActions>(channel);

        if (action.type === SUCCESS_TYPE) {
          return action.payload;
        }

        if (action.type === ERROR_TYPE) {
          throw action.payload;
        }

        if (action.type === REDUX_ACTION_TYPE) {
          // @ts-ignore
          yield put(action.payload);
        }
      }
    } finally {
      yield call([channel, channel.close]);
    }
  };

export default createOfflineFallbackSaga;
