module.exports = {
  extends: ['amex', 'prettier', 'prettier/react'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        parser: 'babel',
        singleQuote: true,
        trailingComma: 'es5',
        bracketSpacing: true,
        jsxBracketSameLine: false,
        printWidth: 100,
      },
    ],
  },
};
