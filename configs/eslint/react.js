module.exports = {
  extends: ['@glossgenius/eslint-config/react'],
  plugins: ['simple-import-sort'],
  rules: {
    'no-empty': ['error', { allowEmptyCatch: true }],
    curly: ['error', 'all'],
    'global-require': 'off',
    'object-curly-newline': 'off',
    'lines-between-class-members': [
      'error',
      'always',
      { exceptAfterSingleLine: true },
    ],

    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/newline-after-import': 'error',
    'import/no-cycle': 'error',
    'import/no-duplicates': 'error',
    'import/no-useless-path-segments': 'error',

    'simple-import-sort/sort': 'error',

    'react/no-unescaped-entities': 'off',
    'react/destructuring-assignment': [
      'error',
      'always',
      { ignoreClassFields: true },
    ],
    'react/jsx-curly-newline': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/state-in-constructor': 'off',
    'react/sort-comp': 'off',
    /*
     * For fbt support:
     * <fbt desc="">
     *   App <FbtParam name="count">1</FbtParam>
     * </fbt>
     * */
    'react/jsx-one-expression-per-line': 'off',
    'jsx-a11y/accessible-emoji': 'off',
    'react/jsx-wrap-multilines': [
      'error',
      {
        // Conflict with eslint-config-prettier
        prop: 'ignore',
      },
    ],

    'lines-around-comment': ['error', { beforeBlockComment: true }],
    'newline-after-var': ['error', 'always'],
    'newline-before-return': 'error',
    'func-names': 'off',
    'no-restricted-syntax': 'off',
    'no-console': 'error',
  },
  overrides: [
    {
      files: ['**/*.tsx'],
      rules: {
        'react/jsx-filename-extension': 'off',
      },
    },
  ],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      parcel: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
