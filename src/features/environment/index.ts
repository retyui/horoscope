import createEnvGetter from './createEnvGetter/index';

export const getPlatformApiUrl = createEnvGetter(
  () => process.env.PLATFORM_API,
  'platformApiUrl',
);
