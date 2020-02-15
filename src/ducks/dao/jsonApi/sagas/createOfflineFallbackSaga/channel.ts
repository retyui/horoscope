import { END, eventChannel } from 'redux-saga';

import { ItemId } from '@/types/jsonApi';

import { IndexResourcesActionType } from '../../../actions';
import handlerOfflineRejects, {
  Options,
} from '../../utils/handlerOfflineRejects';
import { reduxAction, requestFailed, requestSuccess } from './actions';

export type ChannelActions =
  | ReturnType<typeof reduxAction>
  | ReturnType<typeof requestFailed>
  | ReturnType<typeof requestSuccess>;

export const createChannel = (
  options: Omit<Options<any>, 'dispatch'>,
  args: Array<any>,
) =>
  eventChannel<ChannelActions>((emitter) => {
    const handler = handlerOfflineRejects({
      ...options,
      dispatch: (action: IndexResourcesActionType) =>
        emitter(reduxAction(action)),
    });

    handler(...args)
      .then(
        (result: Array<ItemId>) => emitter(requestSuccess(result)),
        (error: Error) => emitter(requestFailed(error)),
      )
      .finally(() => emitter(END));

    return () => {
      // To prevent error: "eventChannel subscribe MUST return a function to unsubscribe"
    };
  });
