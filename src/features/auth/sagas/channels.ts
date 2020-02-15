import { eventChannel } from 'redux-saga';

import api from '../api';

export const createAuthErrorChannel = () =>
  eventChannel((emitter) => {
    const unSubscribe = api.onUnAuthorized(() => {
      emitter({});
    });

    return unSubscribe;
  });
