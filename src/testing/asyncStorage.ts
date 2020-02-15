import AsyncStorage from '@react-native-community/async-storage';

export const mockAsyncStorageMethod = (
  name: keyof typeof AsyncStorage,
  fn: any,
) => {
  const prev = AsyncStorage[name];

  const unMock = () => {
    // @ts-ignore
    AsyncStorage[name] = prev;
  };

  AsyncStorage[name] = fn;

  return unMock;
};
