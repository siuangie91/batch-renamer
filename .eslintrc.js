module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts'],
      },
    },
  },
  rules: {
    'prettier/prettier': ['error'],
    'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 1 }],
    'arrow-parens': ['error', 'as-needed'],
    'arrow-body-style': ['warn', 'as-needed'],
    'prefer-destructuring': [
      'error',
      {
        array: false,
        object: true,
      },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        ts: 'never',
      },
    ],
    'max-len': [
      'error',
      {
        code: 120,
        ignoreComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreRegExpLiterals: true,
        ignoreTemplateLiterals: true,
      },
    ],
    'import/no-cycle': 0,
    'import/prefer-default-export': 'off',
    'no-console': 'warn',
  },
};
