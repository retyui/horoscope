/* istanbul ignore next */
if (process.env.BUILD_ENV === 'production') {
  module.exports = require('./createEnvGetter');
} else {
  module.exports = require('./createEnvGetter.dev');
}
