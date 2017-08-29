require('dotenv').config();
const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');

const { APP_HOST, APP_PORT, API_HOST, API_PORT } = process.env;
const VENDOR_DEPS = Object.keys(require('./package').dependencies || {});
const BASE_PATH = __dirname;
const IS_DEV = process.env.NODE_ENV !== 'production';
const PUBLIC_PATH = '/';
console.log('IS_DEV', IS_DEV);
const webpackConfig = {
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

if (IS_DEV) {
  const appEntry = webpackConfig.entry.app;

  webpackConfig.entry.app = [
    'react-hot-loader/patch',
    'webpack-dev-server/client',
    'webpack/hot/only-dev-server',
    ...appEntry,
  ];

  webpackConfig.plugins.push(
    new Webpack.HotModuleReplacementPlugin()
  );
  webpackConfig.devServer = {
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
  };
} else {
  webpackConfig.plugins.push(
     new Webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
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
    new Webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  )
}

module.exports = webpackConfig;
