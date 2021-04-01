module.exports = {
  extends: [
    'airbnb',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  env: {
    browser: true,
    jasmine: true,
    jest: true,
  },
  plugins: ['@typescript-eslint', 'prettier', 'react'],
  ignorePatterns: ['dist/', 'node_modules/', 'coverage/'],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-explicit-any': 0,
    'import/extensions': 0,
    'import/no-extraneous-dependencies': ['error', {devDependencies: [
      '__test_utils__/*',
      '__tests__/*',
      'rollup.config.js',
      'setupTests.ts',
    ]},],
    'no-underscore-dangle': 0,
    'prettier/prettier': ['error', { singleQuote: true }],
    'react/forbid-prop-types': 0,
    'react/jsx-filename-extension': 0,
    'react/jsx-props-no-spreading': 0,
    'react/static-property-placement': 0,
  },
  settings: {
    react: {
      pragma: 'React',
      version: 'detect',
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  parser: '@typescript-eslint/parser',
};
