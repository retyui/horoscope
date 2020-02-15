import { subDays } from 'date-fns';

import {
  getMockFnCallArgs,
  mockStorage,
  serializer,
  type,
  User,
} from './StorageResource.test-utils';
import { getLastReadKey, getValueKey } from './utils';

describe('.setItems', () => {
  const user: User = { age: 1, name: 'Usr', id: '9' };

  it('should track last read date', async () => {
    const multiSet = jest.fn();
    const instance = mockStorage({ multiSet });

    await instance.setItems([user]);

    const firstCallIndex = 0;
    const firstArgumentIndex = 0;

    const items = getMockFnCallArgs(multiSet, firstCallIndex)[
      firstArgumentIndex
    ];
    const firstRecord = items[0];

    expect(firstRecord[0]).toEqual(getLastReadKey(user.id, type));
    expect(firstRecord[1]).toEqual(expect.any(String));
  });

  it('then storage user item', async () => {
    const multiSet = jest.fn();
    const instance = mockStorage({ multiSet });

    await instance.setItems([user]);

    const secondCallIndex = 1;
    const firstArgumentIndex = 0;

    const items = getMockFnCallArgs(multiSet, secondCallIndex)[
      firstArgumentIndex
    ];

    const firstRecord = items[0];

    expect(firstRecord).toEqual([
      getValueKey(user.id, type),
      JSON.stringify(serializer.serialize(user)),
    ]);
  });
});

describe('.getItems', () => {
  const user: User = { age: 1, name: 'Usr1', id: '1' };
  const user2: User = { age: 2, name: 'Usr2', id: '2' };

  it("should return null when storage no can't find at least one item", async () => {
    const multiGet = jest.fn();
    const multiRemove = jest.fn();
    const instance = mockStorage({ multiGet, multiRemove });

    multiGet.mockResolvedValueOnce([
      [user.id, serializer.serialize(user)],
      [user2.id, null],
    ]);
    multiRemove.mockResolvedValueOnce(undefined);

    const result = await instance.getItems([user.id, user2.id]);

    expect(result).toBeNull();
  });

  it("should throw error when can't get items", async () => {
    const multiGet = jest.fn();
    const instance = mockStorage({ multiGet });
    const error = new Error('Filed get items');

    multiGet.mockRejectedValue(error);

    try {
      await instance.getItems([user.id, user2.id]);
    } catch (err) {
      expect(err).toBe(error);
    }
  });

  it("should not throw error when can't remove ids", async () => {
    const multiGet = jest.fn();
    const multiRemove = jest.fn();
    const instance = mockStorage({ multiGet, multiRemove });

    multiGet.mockResolvedValueOnce([
      [user.id, serializer.serialize(user)],
      [user2.id, null],
    ]);

    multiRemove.mockRejectedValue(new Error());

    const result = await instance.getItems([user.id, user2.id]);

    expect(result).toBeNull();
  });

  it('should tack last date of reading items', async () => {
    const multiGet = jest.fn();
    const multiSet = jest.fn();
    const instance = mockStorage({ multiGet, multiSet });

    multiGet.mockResolvedValueOnce([
      [user.id, JSON.stringify(serializer.serialize(user))],
      [user2.id, JSON.stringify(serializer.serialize(user2))],
    ]);
    multiSet.mockResolvedValueOnce(undefined);

    await instance.getItems([user.id, user2.id]);

    expect(multiSet).toHaveBeenCalledTimes(1);

    const firstCallIndex = 0;
    const firstArgumentIndex = 0;

    const ids = getMockFnCallArgs(multiSet, firstCallIndex)[firstArgumentIndex];

    expect(ids[0][0]).toBe(getLastReadKey(user.id, type));
    expect(ids[1][0]).toBe(getLastReadKey(user2.id, type));
    expect(ids[2]).toBeUndefined();
  });

  it('should  return serialized items index', async () => {
    const multiGet = jest.fn();
    const multiSet = jest.fn();
    const instance = mockStorage({ multiGet, multiSet });

    multiGet.mockResolvedValueOnce([
      [user.id, JSON.stringify(serializer.serialize(user))],
      [user2.id, JSON.stringify(serializer.serialize(user2))],
    ]);
    multiSet.mockResolvedValueOnce(undefined);

    const items = await instance.getItems([user.id, user2.id]);

    expect(items).toEqual({
      [type]: [
        { age: 1, id: '1', name: 'Usr1' },
        { age: 2, id: '2', name: 'Usr2' },
      ],
    });
  });
});

describe('.cleanUp', () => {
  const user: User = { age: 1, name: 'Usr1', id: '1' };
  const user2: User = { age: 2, name: 'Usr2', id: '2' };
  const user3: User = { age: 3, name: 'Usr3', id: '3' };
  const user4: User = { age: 4, name: 'Usr4', id: '4' };
  const user5: User = { age: 5, name: 'Usr5', id: '5' };

  const CACHE_LIFE = 14;

  const otherKeys = [
    getLastReadKey('2', 'other_entity_type'),
    'tokens',
    getLastReadKey('1', 'not_user_type'),
  ];

  const userIds = [user, user2, user3, user4, user5].map(({ id }) => id);
  const lastReadKeys = userIds.map((id) => getLastReadKey(id, type));

  it("should don't remove any items when storage don't include `lastReadKeys`", async () => {
    const getAllKeys = jest.fn().mockResolvedValueOnce(otherKeys);
    const multiGet = jest.fn();
    const multiRemove = jest.fn();

    const instance = mockStorage({ getAllKeys, multiGet, multiRemove });

    await instance.cleanUp({ days: CACHE_LIFE });

    expect(getAllKeys).toHaveBeenCalledTimes(1);
    expect(multiGet).toHaveBeenCalledTimes(0);
    expect(multiRemove).toHaveBeenCalledTimes(0);
  });

  it('should call multiGet with filtered user keys', async () => {
    const getAllKeys = jest
      .fn()
      .mockResolvedValueOnce([...otherKeys, ...lastReadKeys]);
    const multiGet = jest.fn().mockResolvedValueOnce([]);
    const multiRemove = jest.fn().mockResolvedValueOnce(undefined);

    const instance = mockStorage({ getAllKeys, multiGet, multiRemove });

    await instance.cleanUp({ days: CACHE_LIFE });

    expect(multiGet).toHaveBeenCalledWith(lastReadKeys);
  });

  it('should remove items with a LAST_READ date older than 14 days', async () => {
    /*
          records:{
            user  =>  today
            user1 => -4 days
            user2 => -8 days
            user3 => -12 days
            user4 => -16 days // should be deleted!
          }
        */

    const records = lastReadKeys.map((key, index) => [
      key,
      subDays(Date.now(), index * 4),
    ]);
    const allKeys = [...otherKeys, ...lastReadKeys];
    const getAllKeys = jest.fn().mockResolvedValueOnce(allKeys);
    const multiGet = jest.fn().mockResolvedValueOnce(records);
    const multiRemove = jest.fn().mockResolvedValueOnce(undefined);

    const instance = mockStorage({
      getAllKeys,
      multiGet,
      multiRemove,
    });

    await instance.cleanUp({
      days: CACHE_LIFE,
    });

    expect(multiRemove).toHaveBeenCalledWith([
      getValueKey(user5.id, type),
      getLastReadKey(user5.id, type),
    ]);
  });
});

describe('.cleanAll', () => {
  const user: User = { age: 1, name: 'Usr1', id: '1' };
  const user2: User = { age: 2, name: 'Usr2', id: '2' };
  const user3: User = { age: 3, name: 'Usr3', id: '3' };
  const user4: User = { age: 4, name: 'Usr4', id: '4' };
  const user5: User = { age: 5, name: 'Usr5', id: '5' };

  const otherKeys = [
    getLastReadKey('2', 'other_entity_type'),
    'tokens',
    getLastReadKey('1', 'not_user_type'),
  ];

  const userIds = [user, user2, user3, user4, user5].map(({ id }) => id);
  const lastReadKeys = userIds.map((id) => getLastReadKey(id, type));
  const valueKeys = userIds.map((id) => getValueKey(id, type));

  it('should remove all values and last read keys by user type', async () => {
    const getAllKeys = jest
      .fn()
      .mockResolvedValue([...otherKeys, ...lastReadKeys, ...valueKeys]);
    const multiRemove = jest.fn();

    const instance = mockStorage({ getAllKeys, multiRemove });

    await instance.cleanAll();

    expect(getAllKeys).toHaveBeenCalledTimes(2);
    expect(multiRemove).toHaveBeenCalledTimes(1);
    expect(multiRemove).toHaveBeenCalledWith([...valueKeys, ...lastReadKeys]);
  });
});

describe('.removeCustomKeys', () => {
  it('should remove passed keys', async () => {
    const multiRemove = jest.fn().mockResolvedValueOnce({});
    const instance = mockStorage({ multiRemove });

    const keys = ['1', '3', '9'];

    await instance.removeCustomKeys(keys);

    expect(multiRemove).toHaveBeenCalledWith(keys);
  });
});

describe('.setCustomIds', () => {
  it('should store ids', async () => {
    const setItem = jest.fn().mockResolvedValueOnce({});
    const instance = mockStorage({ setItem });

    const key = 'USER_ID';
    const ids = ['1', '3', '9'];

    await instance.setCustomIds(key, ids);

    expect(setItem).toHaveBeenCalledWith(key, JSON.stringify(ids));
  });

  it('should ignore rejects', async () => {
    const setItem = jest.fn().mockRejectedValueOnce(new Error(''));
    const onError = jest.fn();
    const instance = mockStorage({ setItem });

    const key = 'USER_ID';
    const ids = ['1', '3', '9'];

    await instance.setCustomIds(key, ids).catch(onError);

    expect(onError).toHaveBeenCalledTimes(0);
  });
});

describe('.getCustomIds', () => {
  it('should serialize extracted ids', async () => {
    const getItem = jest.fn().mockResolvedValueOnce('["1","3","2"]');
    const instance = mockStorage({ getItem });

    const key = 'USER_ID';

    const ids = await instance.getCustomIds(key);

    expect(ids).toEqual(['1', '3', '2']);
  });

  it('should return null when an error occurred', async () => {
    const getItem = jest.fn().mockRejectedValueOnce(new Error(''));
    const instance = mockStorage({ getItem });

    const key = 'USER_ID';

    const ids = await instance.getCustomIds(key);

    expect(ids).toBe(null);
  });
});

it('should return instance type', () => {
  const instance = mockStorage({});

  expect(instance.getType()).toBe(type);
});
