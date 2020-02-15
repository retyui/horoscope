import StorageResource from './StorageResource';

export const type = 'user';

export const serializer = { parse: (v: any) => v, serialize: (v: any) => v };

export type User = {
  id: string;
  name: string;
  age: number;
};

export const mockStorage = (storage: any) => {
  const instance = new StorageResource<User>({
    serializer,
    type,
  });

  instance.setStorage(storage);

  return instance;
};

export const getMockFnCallArgs = (fn: any, callIndex: number) =>
  fn.mock.calls[callIndex];
