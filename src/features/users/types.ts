import { JsonApiDocument, JsonApiResponse } from '@/types/jsonApi';

import { ENTITY_TYPE } from './consts';

export type UserId = string;

export type UserType = typeof ENTITY_TYPE;

export type UserAttributes = {
  country: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  status: 'active' | 'inactive';
  uuid: string;
};

type JsonApiUserDocument = JsonApiDocument<UserType, UserAttributes>;

export type UserResponse = JsonApiResponse<JsonApiUserDocument>;

export type UpdateUserRequest = {
  email?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  current_password: string;
};
