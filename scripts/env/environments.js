const { createEnvConfig } = require('./envConfig');

const isUrl = (url) => /^https?:\/\//.test(url);

const validateBackendApiUrl = ({ value: platformApiUrl }) => {
  const lastSymbol = platformApiUrl[platformApiUrl.length - 1];

  if (!isUrl(platformApiUrl)) {
    return `Invalid url "${platformApiUrl}"`;
  }

  if (lastSymbol === '/') {
    return "The last symbol can't be `/` please remove it";
  }

  return null;
};

const envs = Object.freeze([
  createEnvConfig(
    'SHOW_DEV_MENU',
    'Flag to control visibility DevMenu button on Login screen (true, false)',
    {
      development: true,
      production: true,
      staging: true,
    },
  ),
  createEnvConfig(
    'PLATFORM_API',
    'Url of backend api (example: https://exmaple.com/v1)',
    {
      development: true,
      production: true,
      staging: true,
      validator: validateBackendApiUrl,
    },
  ),
]);

module.exports = envs;
