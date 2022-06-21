module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'airbnb',
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    project: './tsconfig.json'
  },

  plugins: [
    'react',
    '@typescript-eslint'
  ],

  rules: {
    quotes: [2, 'single'],
    'quote-props': [2, 'as-needed'],
    'linebreak-style': [2, 'unix'],
    'react/prop-types': [0],
    'max-len': [0],
    'jsx-a11y/label-has-associated-control': [0],
    "react/jsx-no-duplicate-props": [2, { "ignoreCase": false }],
    'react/jsx-props-no-spreading': [0],
    'react/function-component-definition': [2, {
      'namedComponents': 'arrow-function',
      'unnamedComponents': 'arrow-function',
    }],
    'no-restricted-exports': [0],
    'react/require-default-props': [0],
    '@typescript-eslint/no-namespace': [0],
  },
};
