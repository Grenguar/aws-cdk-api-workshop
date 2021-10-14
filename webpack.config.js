const path = require('path');
const entry = require('webpack-glob-entry');

module.exports = {
  entry: entry('./src/functions/*.ts'),
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: [
          /node_modules/,
          /infra/,
          path.resolve(__dirname, './infra')
        ],
      },
    ],
  },
  resolve: {
    modules: ['node_modules'],
    extensions: [ '.tsx', '.ts', '.js', '.json' ],
  },
  output: {
    libraryTarget: 'commonjs2',
    path: path.resolve(__dirname, 'code'),
    filename: '[name].js',
  },
  target: 'node',
  mode: 'production',
  plugins: []
};