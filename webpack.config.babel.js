module.exports = {
  entry: './index.dev.js',
  module: {
    rules: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
    }, {
      test: /\.s?css$/,
      loader: 'style-loader!css-loader!sass-loader!import-glob-loader',
      exclude: /node_modules/,
    }],
  },
  devServer: {
    historyApiFallback: true,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
  },
};
