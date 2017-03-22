module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  plugins: [
    'jsx-a11y',
    'react',
  ],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'airbnb',
  ],
};
