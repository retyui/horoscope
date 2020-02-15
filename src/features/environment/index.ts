import createEnvGetter from './createEnvGetter/index';

export const getApplicationName = createEnvGetter(
  () => process.env.APPLICATION_NAME,
  'applicationName',
);

export const getPlatformApiUrl = createEnvGetter(
  () => process.env.PLATFORM_API,
  'platformApiUrl',
);

export const getMixpanelAnalyticsApiToken = createEnvGetter(
  () => process.env.MIXPANEL_ANALYTICS_API_TOKEN,
);

export const getRollbarClientAccessToken = createEnvGetter(
  () => process.env.ROLLBAR_CLIENT_ACCESS_TOKEN,
);

export const getRollbarSourceMapsVersion = createEnvGetter(
  () => process.env.ROLLBAR_SOURCE_MAPS_VERSION,
);
