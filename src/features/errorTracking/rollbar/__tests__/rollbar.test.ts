import { createInstance, getConfig } from '../rollbar';

process.env.BUILD_ENV = 'production';

afterAll(() => {
  delete process.env.BUILD_ENV;
});

describe('getConfig', () => {
  it('should set enabled flag in production mode and when token provided', () => {
    const prevEnv = process.env.NODE_ENV;

    process.env.NODE_ENV = 'production';
    process.env.ROLLBAR_CLIENT_ACCESS_TOKEN = '';

    expect(
      // @ts-ignore
      getConfig().toJSON().enabled,
    ).toBeFalsy();

    process.env.ROLLBAR_CLIENT_ACCESS_TOKEN = 'xxx';

    expect(
      // @ts-ignore
      getConfig().toJSON().enabled,
    ).toBeTruthy();

    process.env.NODE_ENV = prevEnv;
  });
});

describe('createInstance', () => {
  it('should create instance once', () => {
    const instance = createInstance();
    const instance2 = createInstance();

    expect(instance).toBe(instance2);
  });
});
