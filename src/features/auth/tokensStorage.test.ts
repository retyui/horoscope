import AsyncStorage from '@react-native-community/async-storage';

import { ASYNC_STORAGE_TOKENS_KEY } from './consts';
import { flushTokens, getTokens, storeTokens } from './tokensStorage';

describe('flushTokens', () => {
  const mockRemoveItem = jest.fn();

  AsyncStorage.removeItem = mockRemoveItem;

  it('should call removeItem with token key', () => {
    expect(mockRemoveItem).toHaveBeenCalledTimes(0);

    flushTokens();

    expect(mockRemoveItem).toHaveBeenCalledTimes(1);
    expect(mockRemoveItem).toHaveBeenCalledWith(ASYNC_STORAGE_TOKENS_KEY);
  });
});

describe('getTokens', () => {
  const mockGetItem = jest.fn();

  AsyncStorage.getItem = mockGetItem;

  it('should return null when storage do not have value', async () => {
    mockGetItem.mockResolvedValueOnce(null);

    expect(await getTokens()).toBeNull();
  });

  it('should return null when storage value not valid JSON', async () => {
    mockGetItem.mockResolvedValueOnce('<invalid_json>');

    expect(await getTokens()).toBeNull();
  });

  it('should return tokens object', async () => {
    mockGetItem.mockResolvedValueOnce(
      '{"accessToken":"1", "refreshToken":"2"}',
    );

    expect(await getTokens()).toEqual({
      accessToken: '1',
      refreshToken: '2',
    });
  });
});

describe('storeTokens', () => {
  const mockSetItem = jest.fn();

  AsyncStorage.setItem = mockSetItem;

  it('should call setItem with serialized ', async () => {
    expect(mockSetItem).toHaveBeenCalledTimes(0);

    await storeTokens({
      accessToken: '1',
      refreshToken: '2',
    });

    expect(mockSetItem).toHaveBeenCalledTimes(1);
    expect(mockSetItem).toHaveBeenCalledWith(
      ASYNC_STORAGE_TOKENS_KEY,
      '{"accessToken":"1","refreshToken":"2"}',
    );
  });
});
