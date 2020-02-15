const { getBuildEnv } = require('./build-env');

const validateBuildEnv = () => {
  if (!getBuildEnv()) {
    throw new Error(`
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

⚠️  You can't build javascript bundle without: "BUILD_ENV" environment variable (Try to set 'staging' or 'production')!

!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    `);
  }
};

module.exports = {
  validateBuildEnv,
};
