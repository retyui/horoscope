import { isFailedRefreshTokensRequest } from './utils';

describe('isFailedRefreshTokensRequest', () => {
  it('should return falsy when passed not error object', () => {
    expect(
      isFailedRefreshTokensRequest(
        // @ts-ignore
        {},
      ),
    ).toBeFalsy();
  });

  it('should return true when passed axios error with expected url', () => {
    expect(
      isFailedRefreshTokensRequest(
        // @ts-ignore
        { config: { url: 'https:/api.com/auth/refresh' } },
      ),
    ).toBeTruthy();
  });
});
