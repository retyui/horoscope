const { dotEnvExpand } = require('./dotenv/expand');
const { BUILD_ENV_KEY } = require('./dotenv/build-env');
const { getBuildType } = require('./dotenv/build-type');
const { validateInjectedEnvs } = require('./validate');

const getRequiredEnvVarsNames = () => {
  const environments = require('./environments');

  const buildType = getBuildType();

  dotEnvExpand(buildType);

  return [BUILD_ENV_KEY, ...validateInjectedEnvs(environments)];
};

module.exports = {
  getRequiredEnvVarsNames,
};
