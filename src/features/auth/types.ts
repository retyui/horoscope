import { UserAttributes, UserType } from '@/features/users/types';
import { JsonApiDocument, JsonApiResponse } from '@/types/jsonApi';

export type Token = string;

export type TokensType = 'tokens';

export type AuthTokens = {
  readonly accessToken: Token;
  readonly refreshToken: Token;
};

export type SignInRequest = {
  email: string;
  password: string;
};

export type SignInResponse = JsonApiResponse<
  JsonApiDocument<TokensType, { access_token: string; refresh_token: string }>
>;

export type OptionalAuthTokens = {
  readonly accessToken: Token;
  readonly refreshToken?: Token;
};

export type RefreshRequest = {
  refresh_token: Token;
};

export type RefreshResponse = JsonApiResponse<
  JsonApiDocument<TokensType, { access_token: string; refresh_token?: string }>
>;

export type RecoveryPasswordRequest = {
  email: string;
};

export type RecoveryPasswordResponse = {
  token: string;
};

export type SignUpRequest = {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone: string;
};

export type SignUpResponse = JsonApiResponse<
  JsonApiDocument<
    UserType,
    UserAttributes & {
      access_token: string;
      refresh_token: string;
    }
  >
>;

export type VerifyParamsRequest = { email: string } | { phone: string };

export type VerifyParamsResponse = {};

export type ConfirmOrganizationPasswordRequest = {
  password: string;
};

export type ConfirmOrganizationPasswordResponse = JsonApiResponse<
  JsonApiDocument<UserType, UserAttributes>
>;
