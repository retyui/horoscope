const { getBuildEnv } = require('./build-env');

const availableEnvs = ['production', 'staging', 'qa'];

const validateBuildEnv = () => {
  if (!availableEnvs.includes(getBuildEnv())) {
    throw new Error(`
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

⚠️  You can't build javascript bundle without: "BUILD_ENV" environment variable (Try to set ${availableEnvs.join(
      ' or ',
    )})!

!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    `);
  }
};

const getBuildType = () => {
  if (process.env.NODE_ENV === 'production') {
    validateBuildEnv();
  }

  if (availableEnvs.includes(getBuildEnv())) {
    return getBuildEnv();
  }

  return 'development';
};

module.exports = {
  validateBuildEnv,
  getBuildType,
};
