module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    'react',
    'react-hooks',
    '@typescript-eslint',
    'prettier'
  ],
  env: {
    browser: true,
    jest: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
    'next/core-web-vitals',
    'next/typescript'
  ],
  rules: {
    // general
    'no-param-reassign': 'error',
    'semi': ['error', 'always'],
    'max-len': [
      'error',
      {
        code: 120,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
        ignoreComments: true,
      },
    ],

    // ts
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-invalid-this': 'error',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        args: 'none',
        vars: 'all',
      },
    ],

    // react
    'react/jsx-boolean-value': 'off',
    'react/jsx-key': 'error',
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'react/self-closing-comp': [
      'error',
      {
        component: true,
        html: true,
      },
    ],

    // react-hooks
    'react-hooks/exhaustive-deps': 'off',
  }
};
