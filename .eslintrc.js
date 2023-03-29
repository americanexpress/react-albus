module.exports = {
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 12,
    parser: '@babel/eslint-parser',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    babelOptions: {
      presets: ['@babel/preset-react'],
    },
  },
  extends: ['amex', 'eslint:recommended', 'plugin:prettier/recommended'],
  plugins: ['only-warn'], // Only warn temp until code is fixed effected
  env: {
    browser: true,
    node: true,
    commonjs: true,
  },
  overrides: [
    {
      files: ['**/__test__/**'],
      extends: ['amex/test', 'plugin:prettier/recommended'],
    },
  ],
};
