import { subDays } from 'date-fns';
import { flatten, isEmpty } from 'ramda';

import { SerializerDescriptor } from '@/features/serializers/params/types';
import { ItemId } from '@/types/jsonApi';

import { AbstractStorage, Storage } from './types';
import {
  filterLastReadIndex,
  getLastReadKey,
  getValueKey,
  isSuccessfulMultiGet,
} from './utils';

type Options<T> = {
  type: string;
  serializer: SerializerDescriptor<any>;
  idProp?: (item: T) => string;
  asyncStorage?: Storage;
};

class BaseStorageResource<T extends { id: ItemId }>
  implements AbstractStorage<T> {
  type: string;
  idProp: (item: T) => string;
  serializer: SerializerDescriptor<T>;
  // @ts-ignore
  storage: Storage;

  constructor({ type, serializer, idProp = ({ id }) => id }: Options<T>) {
    this.type = type;
    this.serializer = serializer;
    this.idProp = idProp;
  }

  getType() {
    return this.type;
  }

  setStorage(storage: Storage) {
    this.storage = storage;
  }

  multiRemove(ids: Array<string>): Promise<void> {
    const keys = flatten(
      ids.map((id) => [
        getValueKey(id, this.type),
        getLastReadKey(id, this.type),
      ]),
    );

    return this.storage.multiRemove(keys);
  }

  async getKeysByType(prefix: string) {
    const keys = await this.storage.getAllKeys();

    return keys.filter((key) => key.startsWith(prefix));
  }

  async cleanAll() {
    const valuePrefix = getValueKey('', this.type);
    const lastReadPrefix = getLastReadKey('', this.type);

    const valueKeys = await this.getKeysByType(valuePrefix);
    const lastReadKeys = await this.getKeysByType(lastReadPrefix);

    await this.storage.multiRemove([...valueKeys, ...lastReadKeys]);
  }

  async cleanUp({ days }: { days: number }): Promise<void> {
    const prefix = getLastReadKey('', this.type);
    const keysByType = await this.getKeysByType(prefix);

    if (isEmpty(keysByType)) {
      return undefined;
    }

    const result = await this.storage.multiGet(keysByType);
    const date = subDays(Date.now(), days);
    const oldestKeys = filterLastReadIndex(date, result);
    const ids = oldestKeys.map(([key]) => key.replace(prefix, ''));

    return this.multiRemove(ids);
  }

  trackLastRead(ids: Array<string>) {
    const value = JSON.stringify(Date.now());

    return this.storage.multiSet(
      ids.map((id) => [getLastReadKey(id, this.type), value]),
    );
  }

  parseResult(result: Array<[string, string]>): Array<T> {
    const { parse } = this.serializer;

    return result.map(([, val]) => parse(JSON.parse(val)));
  }

  async getItems(ids: Array<string>): Promise<Record<string, Array<T>> | null> {
    const result = await this.storage.multiGet(
      ids.map((id) => getValueKey(id, this.type)),
    );

    if (!isSuccessfulMultiGet(result)) {
      await this.multiRemove(ids).catch(() => {});

      return null;
    }

    const parsedResult = {
      [this.type]: this.parseResult(
        // @ts-ignore
        result,
      ),
    };

    await this.trackLastRead(ids);

    return parsedResult;
  }

  serializeItem(item: any) {
    const { parse, serialize } = this.serializer;

    return JSON.stringify(serialize(parse(item)));
  }

  async setItems(items: Array<T>): Promise<void> {
    const serializedItems = items.map((item) => [
      getValueKey(item.id, this.type),
      this.serializeItem(item),
    ]);

    await this.trackLastRead(items.map(this.idProp));

    return this.storage.multiSet(serializedItems);
  }
}

export default BaseStorageResource;
