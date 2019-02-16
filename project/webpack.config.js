const webpack = require('webpack');
// const path = require('path');
const postcssCssnext = require('postcss-cssnext');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    vendor: ['jquery', 'vue'],
    './src/test/': './src/test/',
    './src/index/': './src/index/',
    // './src/index/bundle': path.resolve(__dirname, 'src/index/'),
  },
  output: {
    // path: path.resolve(__dirname, 'dist'),
    // publicPath: '/dist',
    filename: '[name]bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /loading\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [postcssCssnext()],
              },
            },
          ],
          fallback: 'style-loader',
        }),
      },
      {
        test: /^(?!.*loading).+\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              minimize: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [postcssCssnext()],
            },
          },
        ],
      },
      {
        // test: /\.css$/,
        // test: /\.styl$/,
        // use: [{
        //     loader: 'style-loader'
        // }, {
        //     loader: 'css-loader',
        //     options: {
        //         modules: true,
        //         minimize: true,
        //     }
        // }, {
        //     loader: 'postcss-loader'
        // }, {
        //     loader: 'stylus-loader'
        // }]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        loader: 'file-loader',
      },
      {
        test: /\.(gif|svg|png|jpe?g)(\?\S*)?$/,
        loader: 'url-loader',
        options: {
          name: '/[path][name].[ext]',
          limit: 10240,
        },
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('./dist/common.css'),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: './dist/common.js',
    }),
    new webpack.optimize.UglifyJsPlugin(),
    // new HtmlWebpackPlugin({
    //     filename: './index.html',
    //     template: path.resolve(__dirname, '../src/index/index.html'),
    //     inject: true
    // }),
  ],
  devServer: {
    port: 5555,
    host: '0.0.0.0',
    hot: true,
    inline: true,
    disableHostCheck: true,
    historyApiFallback: true,
    // proxy: [{
    //     context: ['/wap', '/api'],
    //     target: 'http://t.egaiyi.com',
    //     changeOrigin: true
    // }]
  },
  devtool: 'eval',
  resolve: {
    alias: {
      vue: 'vue/dist/vue',
      // vue: 'vue/dist/vue.min',
      // jquery: 'jquery/src/jquery',
    },
  },
};
