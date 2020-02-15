const { getBuildType } = require('./dotenv/build-type');

const getValidationErrors = (envsConfigsList, buildType) => {
  const validationErrors = [];
  const emptyVars = [];

  for (const {
    name: envVariableName,
    validator,
    [buildType]: buildTypeFlag,
  } of envsConfigsList) {
    const value = process.env[envVariableName];

    if (value && validator) {
      const error = validator({ value });

      if (error) {
        validationErrors.push(`[${envVariableName}]: ${error}`);
      }
    }

    if (buildTypeFlag && !value) {
      emptyVars.push(envVariableName);
    }
  }

  if (emptyVars.length > 0) {
    validationErrors.unshift(
      `You can't build javascript bundle without: "${emptyVars.join(
        ', ',
      )}" environment variable(s)!`,
    );
  }

  return validationErrors;
};

const validateInjectedEnvs = (envsConfigsList) => {
  const buildType = getBuildType();
  const errors = getValidationErrors(envsConfigsList, buildType);

  if (errors.length > 0) {
    throw new Error(`\n\n\n
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

⚠️\t${errors.join(`\n⚠️\t`)}

!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
\n\n\n`);
  }

  return envsConfigsList.map(({ name }) => name);
};

module.exports = {
  validateInjectedEnvs,
};
