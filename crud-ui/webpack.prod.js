/* eslint comma-dangle: 0, global-require: 0 */
const Webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  devtool: 'cheap-module-source-map',
  plugins: [
    /*
    new UglifyJSPlugin({
      beautify: false,
      compress: {
        screw_ie8: true,
        warnings: false,
      },
      output: {
        comments: false,
        screw_ie8: true,
      },
      mangle: {
        screw_ie8: true,
      },
      sourceMap: false,
    }),
    */
    new Webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ]
});
