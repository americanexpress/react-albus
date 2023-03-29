import path from 'path';

module.exports = {
  entry: './index.dev.js',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        options: { presets: ['@babel/env', '@babel/preset-react'] },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    alias: {
      'react-albus': path.resolve(__dirname, 'src'),
    },
  },
};
