module.exports = {
  extends: [
    require.resolve('../configs/eslint/jest'),
    require.resolve('../configs/eslint/react'),
    require.resolve('../configs/eslint/hooks'),
    require.resolve('../configs/eslint/typescript'),
  ],
};
