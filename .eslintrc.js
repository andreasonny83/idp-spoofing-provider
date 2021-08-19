module.exports = {
  env: {
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 2017,
  },
  extends: 'eslint:recommended',
  root: true,
  rules: {
    'no-console': ['warn'],
  },
  overrides: [
    {
      files: ['src/**/*'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    },
  ],
};
