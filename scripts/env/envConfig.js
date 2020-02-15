const defaultOptions = {
  development: false,
  production: false,
  staging: false,
  validator: null,
};

const createEnvConfig = (environmentVariableName, description, userOptions) =>
  Object.freeze({
    ...defaultOptions,
    ...userOptions,
    name: environmentVariableName,
    description,
  });

module.exports = {
  createEnvConfig,
};
