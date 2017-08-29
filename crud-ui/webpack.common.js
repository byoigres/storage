/* eslint comma-dangle: 0, global-require: 0 */
require('dotenv').config();
const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

const VENDOR_DEPS = Object.keys(require('./package').dependencies || {});

const { APP_HOST, APP_PORT, API_HOST, API_PORT } = process.env;
const BASE_PATH = __dirname;
const IS_DEV = process.env.NODE_ENV !== 'production';
module.exports = {
  name: 'titotline-ui',
  target: 'web',
  entry: {
    app: [
      'babel-polyfill',
      './src/index.js'
    ],
    vendor: VENDOR_DEPS
  },
  output: {
    path: path.join(BASE_PATH, 'dist'),
    publicPath: '/',
    filename: '[name].js',
    sourceMapFilename: '[name].map.js',
  },
  resolve: {
    modules: [
      'node_modules',
    ],
    alias: {
      actions: path.resolve(__dirname, './src/actions'),
      constants: path.resolve(__dirname, './src/constants'),
      components: path.resolve(__dirname, './src/components'),
      containers: path.resolve(__dirname, './src/containers'),
      api: path.resolve(__dirname, './src/api'),
    },
    extensions: ['.js', 'json'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
        include: path.join(BASE_PATH, 'src'),
      },
    ],
  },
  devtool: IS_DEV ? 'cheap-module-eval-source-map' : 'source-map',
  plugins: [
    new Webpack.NamedModulesPlugin(),
    new Webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks(module) {
        // this assumes your vendor imports exist in the node_modules directory
        return module.context && module.context.indexOf('node_modules') !== -1;
      },
    }),
    new CopyWebpackPlugin([
      { from: './public/manifest.json' },
    ]),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      favicon: './public/favicon.ico',
      title: 'CRUD de ejemplo Coppel',
      publicUrl: `${APP_HOST}:${APP_PORT}`,
      apiUrl: `${API_HOST}:${API_PORT}/crud`,
      isDev: IS_DEV,
      hash: false,
      inject: 'body',
    }),
  ],
};
