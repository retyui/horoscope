import StorageResource from '@/features/cache/StorageResource';

import { CURRENT_USER_ID_KEY } from './consts/cache';
import { ENTITY_TYPE } from './consts/index';
import serializer from './serializer';
import { UserAttributes, UserId } from './types';

class Users extends StorageResource<UserAttributes & { id: UserId }> {
  async setCurrentUserIds(ids: Array<UserId>) {
    return this.setCustomIds(CURRENT_USER_ID_KEY, ids);
  }

  async cleanAll() {
    await this.removeCustomKeys([CURRENT_USER_ID_KEY]);
    await super.cleanAll();
  }

  async getStoredCurrentUser() {
    const ids = await this.getCustomIds(CURRENT_USER_ID_KEY);

    if (ids) {
      return this.getItems(ids);
    }

    return null;
  }
}

const contentPagesStorage = new Users({
  type: ENTITY_TYPE,
  serializer,
});

export default contentPagesStorage;
