/* eslint comma-dangle: 0, global-require: 0 */
const Webpack = require('webpack');
const merge = require('webpack-merge');

const common = require('./webpack.common.js');

const { APP_HOST, APP_PORT } = process.env;
const PUBLIC_PATH = '/';

module.exports = merge(common, {
  entry: {
    app: [
      'react-hot-loader/patch',
      'webpack-dev-server/client',
      'webpack/hot/only-dev-server'
    ]
  },
  devtool: 'inline-source-map',
  plugins: [
    new Webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: './src',
    historyApiFallback: true,
    host: APP_HOST,
    port: APP_PORT,
    hot: true,
    inline: true,
    publicPath: PUBLIC_PATH,
    overlay: true,
    stats: {
      cached: true,
      cachedAssets: true,
      chunks: true,
      chunkModules: false,
      colors: true,
      hash: false,
      reasons: true,
      timings: true,
      version: false,
    },
  }
});
