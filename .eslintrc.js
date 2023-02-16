const tsconfigPaths = require('./tsconfig.path.json').compilerOptions.paths
const tsconfigPathRegexps = Object.keys(tsconfigPaths).map(
  (basePath) => `^${basePath.replace(/\/\*^/, '')}`,
)
const externalPathRegexps = ['^react', '^node:', '^@?\\w']
const typeImportPathRegexps = [...externalPathRegexps, ...tsconfigPathRegexps].map(
  (path) => `${path}.*\\u0000$`,
)

module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      tsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'simple-import-sort', 'import'],
  rules: {
    'react/prop-types': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          ['^\\u0000'],
          externalPathRegexps,
          [...tsconfigPathRegexps, '^\\.'],
          ['^'],
          [...typeImportPathRegexps, '^.+\\u0000$'],
          ['^.+\\.sass$'],
        ],
      },
    ],
    'simple-import-sort/exports': 'error',
    'import/no-duplicates': 'error',
    '@typescript-eslint/consistent-type-imports': 'error',
    'arrow-body-style': ['error', 'as-needed'],
    'react-hooks/rules-of-hooks': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
