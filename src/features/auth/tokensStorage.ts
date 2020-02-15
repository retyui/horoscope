import AsyncStorage from '@react-native-community/async-storage';

import { ASYNC_STORAGE_TOKENS_KEY } from './consts';
import { AuthTokens } from './types';

export const flushTokens = () =>
  AsyncStorage.removeItem(ASYNC_STORAGE_TOKENS_KEY);

export const storeTokens = (tokens: AuthTokens) =>
  AsyncStorage.setItem(ASYNC_STORAGE_TOKENS_KEY, JSON.stringify(tokens));

export const getTokens = async (): Promise<AuthTokens | null> => {
  try {
    const tokensRaw = await AsyncStorage.getItem(ASYNC_STORAGE_TOKENS_KEY);
    const { accessToken, refreshToken } = JSON.parse(tokensRaw || '{}');

    if (accessToken && refreshToken) {
      return { accessToken, refreshToken };
    }

    return null;
  } catch (e) {
    return null;
  }
};
