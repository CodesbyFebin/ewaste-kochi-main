module.exports = {
  extends: [
    'eslint:recommended',
  ],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  env: {
    browser: true,
    node: true,
    es2022: true,
  },
  globals: {
    console: 'readonly',
    process: 'readonly',
    Buffer: 'readonly',
    Map: 'readonly',
    Set: 'readonly',
    IntersectionObserver: 'readonly',
  },
  overrides: [
    {
      files: ['*.astro'],
      extends: ['plugin:astro/recommended'],
      parser: 'astro-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
      },
      env: {
        browser: true,
        node: true,
      },
    },
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
      },
      env: {
        browser: true,
        node: true,
        es2022: true,
      },
    },
  ],
  rules: {
    'no-unused-vars': 'warn',
    'no-undef': 'off', // Turn off for browser globals
  },
  ignorePatterns: [
    'dist/',
    'node_modules/',
    '*.config.js',
    '*.config.mjs',
  ],
};