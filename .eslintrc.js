module.exports = {
  'env': {
    'browser': true,
    'jest': true,
    'es6': true,
    'node': true,
  },
  'extends': [
    'airbnb',
  ],
  'rules': {
    'react/prefer-stateless-function': 'off',
    'react/jsx-filename-extension': 'off',
    'one-var': 'off',
    'no-new': 'off',
    'no-param-reassign': 'off',
    'no-plusplus': 'off',
    'no-confusing-arrow': 'off',
    'no-new-wrappers': 'off',
    'no-restricted-globals': 'off',
    'object-shorthand': 'off',
    'operator-linebreak': 'off',
    'no-underscore-dangle': 'off',
    'no-alert': 'off',
    'no-console': 'off',
    'object-curly-newline': 'off',
    'yoda': 'off',
    'comma-dangle': ['error', 'never'],
    'max-len': ['error', 120, 2, { ignoreComments: true }],
    'no-unused-vars': ['warn', { 'vars': 'local', 'args': 'none' }],
    'no-cond-assign': ['error', 'except-parens'],
    'no-nested-ternary': 'off',
    'no-trailing-spaces': 'off',
    'import/prefer-default-export': 'off',
    'linebreak-style': 'off',
    'no-continue': 'off'
  },
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    }
  }
};
