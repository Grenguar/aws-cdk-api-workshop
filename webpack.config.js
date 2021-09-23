const path = require('path');
const entry = require('webpack-glob-entry');

// const dir = 'src'
// const entry = readdirSync(dir)
//   .filter(item => /\.([tj])s$/.test(item))
//   .filter(item => !/\.d\.([tj])s$/.test(item))
//   .reduce((acc, fileName) => ({
//     ...acc,
//     [fileName.replace(/\.([tj])s$/, '')]: `./${dir}/${fileName}`
//   }), {})

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