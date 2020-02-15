/*
 When it will be changed
 Don't forget to update `if` condition in src/features/auth/routes.ts
*/
if (process.env.SHOW_DEV_MENU === 'true') {
  module.exports = require('./component.dev');
} else {
  module.exports = require('./component');
}
