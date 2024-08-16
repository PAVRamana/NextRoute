module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['import', '@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    '@typescript-eslint/no-explicit-any': 'warn',
    'object-curly-spacing': ['error', 'always'],
    curly: 'error',
    eqeqeq: ['error', 'smart'],
    'import/order': ['warn', { alphabetize: { order: 'asc', caseInsensitive: true } }],
    'no-empty': 'error',
    'no-unused-vars': 'error',
    'import/no-named-as-default': 'off',
    'react-hooks/exhaustive-deps': 'off'
  },
  settings: {
    react: {
      version: 'detect'
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json'
      }
    }
  },
  overrides: [
    {
      files: ['.*.js', '*.config.*js'],
      env: {
        browser: false,
        node: true
      }
    }
  ]
};
