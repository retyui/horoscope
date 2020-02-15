const { resolve } = require('path');
const { name: displayName } = require('./package');

const transformIgnore = [
  'react-native',
  '@react-native-community/async-storage',
  'react-native-fast-image',
  'react-native-stylex',
];

module.exports = {
  displayName,
  testEnvironment: 'jsdom',
  cacheDirectory: resolve(__dirname, './node_modules/.jestcache'),
  setupFiles: ['<rootDir>/src/testing/jest.setup.ts'],
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testRegex: '\\.test\\.(js|ts)x?$',
  coverageThreshold: {
    global: { branches: 90, functions: 90, statements: 90 },
  },
  moduleNameMapper: {
    '^@/(.*)': '<rootDir>/src/$1',
  },
  coveragePathIgnorePatterns: ['/node_modules/', '(.*)/styles.ts'],
  transformIgnorePatterns: [`node_modules/(?!(${transformIgnore.join('|')})/)`],
};
