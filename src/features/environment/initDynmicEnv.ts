// @ts-ignore
if (process.env.BUILD_ENV !== 'production') {
  const { restoreStoredEnvs } = require('./dynamicEnvs');

  restoreStoredEnvs();
}
