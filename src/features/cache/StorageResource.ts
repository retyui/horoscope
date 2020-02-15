import { ItemId } from '@/types/jsonApi';

import BaseStorageResource from './BaseStorageResource';

const noop = () => {};

class StorageResourceWithHelpers<
  T extends { id: ItemId }
> extends BaseStorageResource<T> {
  async removeCustomKeys(keys: Array<string>): Promise<void> {
    return this.storage.multiRemove(keys).catch(noop);
  }

  async setCustomIds(key: string, ids: Array<ItemId>): Promise<void> {
    return this.storage.setItem(key, JSON.stringify(ids)).catch(noop);
  }

  async getCustomIds(key: string): Promise<Array<ItemId> | null> {
    try {
      const value = await this.storage.getItem(key);

      // @ts-ignore
      return JSON.parse(value);
    } catch (e) {
      return null;
    }
  }
}

export default StorageResourceWithHelpers;
