/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier',
  ],
  rules: {
    'vue/multi-word-component-names': 0,
    'vue/component-name-in-template-casing': ['warn', 'PascalCase'],
    'vue/attribute-hyphenation': ['warn', 'never', {
      'ignore': ['camelCase']
    }],
    'vue/v-on-event-hyphenation': ['warn', 'never'],

    'vue/block-lang': [
      'warn',
      {
        script: { lang: 'ts' },
        style: { lang: 'scss' },
      },
    ],

    'no-empty-function': 'off',
    '@typescript-eslint/no-empty-function': 'off',
  },
  parserOptions: {
    ecmaVersion: 'latest',
  },
};
