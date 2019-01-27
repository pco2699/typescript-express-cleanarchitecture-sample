const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'development',
  entry: './src/server.ts',
  target: 'node',
  externals: [nodeExternals()],
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        enforce: 'pre',
        loader: 'tslint-loader',
        test: /\.ts?$/,
        exclude: /node_modules/,
        options: {
          fix: true,
          configFile: 'tslint.json',
          tsConfigFile: 'tsconfig.json',
        }
      },
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'dist')
  },

};