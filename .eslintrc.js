module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },

  extends: 'standard-with-typescript',
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: './tsconfig.json'
  },
  ignorePatterns: ['.eslintrc.js', 'jest.config.js'],
  rules: {
    'no-bitwise': 0,
    indent: [
      1,
      2,
      {
        SwitchCase: 1
      }
    ],
    'no-tabs': 2,
    semi: 2,
    camelcase: [
      'error',
      {
        properties: 'never',
        ignoreDestructuring: true
      }
    ],
    'arrow-parens': ['error', 'always'],
    'func-style': ['off', 'expression'],
    'no-useless-rename': [
      'error',
      {
        ignoreDestructuring: false,
        ignoreImport: false,
        ignoreExport: false
      }
    ],
    'no-script-url': 'off',
    'no-var': 'error',
    'prefer-arrow-callback': [
      'error',
      {
        allowNamedFunctions: false,
        allowUnboundThis: true
      }
    ],
    'prefer-const': [
      'error',
      {
        destructuring: 'any',
        ignoreReadBeforeAssign: true
      }
    ],
    'prefer-destructuring': [
      'error',
      {
        VariableDeclarator: {
          array: false,
          object: true
        },
        AssignmentExpression: {
          array: true,
          object: true
        }
      },
      {
        enforceForRenamedProperties: false
      }
    ],
    'no-array-constructor': 'error',
    'arrow-body-style': 'error',
    'prefer-rest-params': 'error',
    'prefer-template': 'error',
    'import/no-commonjs': 'off',
    'import/no-amd': 'error',
    'import/exports-last': 'off',
    'line-comment-position': [
      'error',
      {
        position: 'above',
        ignorePattern: '',
        applyDefaultPatterns: true
      }
    ],
    'no-new-object': 'error',
    'semi-style': ['error', 'last'],
    'no-use-before-define': [
      'error',
      {
        functions: true,
        classes: true,
        variables: true
      }
    ],
    'no-extend-native': 'error',
    eqeqeq: ['error', 'always'],
    'no-empty': 'error',
    'no-console': 'off',
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/strict-boolean-expressions': 0,
    '@typescript-eslint/no-non-null-assertion': 0
  }
}
