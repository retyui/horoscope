const BUILD_ENV_KEY = 'BUILD_ENV';

const getBuildEnv = () => process.env[BUILD_ENV_KEY];

module.exports = { getBuildEnv, BUILD_ENV_KEY };
