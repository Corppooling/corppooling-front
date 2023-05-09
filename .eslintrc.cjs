module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  globals: {
    NodeJS: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    '@vue/typescript/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:tailwindcss/recommended',
    '@vue/eslint-config-prettier',
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'tailwindcss', 'no-secrets'],
  rules: {
    'no-console': ['error', { allow: ['error'] }],
    'no-alert': 'error',
    'prettier/prettier': [
      'error',
      {
        tabWidth: 2,
      },
    ],
    'object-curly-spacing': ['error', 'always'],
    semi: ['error', 'always'],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    'require-await': 'off',
    'no-plusplus': 'off',
    'no-extra-boolean-cast': 'off',
    'consistent-return': 'error',
    'default-case': 'error',
    'default-param-last': 'error',
    'linebreak-style': ['error', 'unix'],
    'sort-imports': ['error', { ignoreDeclarationSort: true }],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: ['function', 'class', 'export'] },
    ],
    'vue/require-explicit-emits': 'error',
    'no-return-await': 'error',
    '@typescript-eslint/no-empty-function': 0,
    'vue/multi-word-component-names': 0,
    'vue/no-mutating-props': 'error',
    'vue/return-in-emits-validator': 'error',
    'vue/script-setup-uses-vars': 'error',
    'tailwindcss/no-custom-classname': 0,
    'vue/v-on-event-hyphenation': 0,
    'vue/attribute-hyphenation': [
      'warn',
      'never',
      {
        ignore: ['camelCase'],
      },
    ],
    'tailwindcss/migration-from-tailwind-2': 0,
    'tailwindcss/enforces-negative-arbitrary-values': 0,
    'vue/no-v-html': 0,
    'no-secrets/no-secrets': ['error', { ignoreContent: [/\?v=\d+$/gm] }],
    'no-unneeded-ternary': 'error',
    'vue/prop-name-casing': 'error',
  },
  overrides: [
    {
      files: ['*.ts'],
      rules: {
        'require-jsdoc': [
          'error',
          {
            require: {
              FunctionDeclaration: true,
              MethodDefinition: true,
              ClassDeclaration: true,
              ArrowFunctionExpression: true,
            },
          },
        ],
      },
    },
    {
      files: ['*.test.ts'],
      rules: {
        'require-jsdoc': 0,
        'no-secrets/no-secrets': 0,
      },
    },
  ],
};
