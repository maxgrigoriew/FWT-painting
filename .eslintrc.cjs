module.exports = {
  root: true,
  extends: ['plugin:vue/vue3-essential', '@vue/eslint-config-airbnb'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'import/prefer-default-export': [
      'off',
      {
        target: 'single',
      },
    ],
  },
};
