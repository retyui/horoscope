import JsonApiResource from '@/api/JsonApiResource';

import { UpdateUserRequest, UserResponse } from './types';

class UsersResource extends JsonApiResource {
  getCurrentUser() {
    return this.doGet<UserResponse>(`/profile`);
  }

  updateCurrentUser(data: UpdateUserRequest) {
    return this.doPatch<UpdateUserRequest, UserResponse>(
      `/profile/update`,
      data,
    );
  }
}

export default new UsersResource();
