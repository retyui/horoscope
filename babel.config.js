const { resolve } = require('path');

const { validateFbtEnumPath } = require('./scripts/i18n/validate');
const { getRequiredEnvVarsNames } = require('./scripts/env');

const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';
const isTest = process.env.NODE_ENV === 'test';

const manifestPath = resolve(
  __dirname,
  './node_modules/.i18n-cache/enum-manifest.json',
);

const requiredEnvVarsNames = getRequiredEnvVarsNames();
const fbtEnumPath = validateFbtEnumPath(manifestPath);

const presets = ['module:metro-react-native-babel-preset'];
const plugins = [
  'babel-plugin-fbt-runtime',
  ['babel-plugin-fbt', { fbtEnumPath }],
];

if (!isTest) {
  plugins.push([
    'babel-plugin-transform-inline-environment-variables',
    { include: requiredEnvVarsNames },
  ]);
}

if (isDev || isProd) {
  plugins.push('babel-plugin-lodash');
  plugins.push([
    'babel-plugin-transform-imports',
    {
      yup: {
        transform: 'yup/lib/${member}',
        preventFullImport: true,
      },
      lodash: {
        transform: 'lodash/${member}',
        preventFullImport: true,
      },
      ramda: {
        transform: 'ramda/src/${member}',
        preventFullImport: true,
      },
      'date-fns': {
        transform: 'date-fns/${member}',
        preventFullImport: true,
      },
    },
  ]);
}

module.exports = {
  presets,
  plugins,
};
