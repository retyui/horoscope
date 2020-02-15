module.exports = {
  extends: require.resolve('./base'),
  env: { node: true },
  rules: { 'no-console': 'off' },
  parserOptions: { sourceType: 'script' },
};
