const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

const LodashModuleReplacementPlugin = require('lodash-webpack-plugin'); // lodash
const sass = require('node-sass'); // scss
const CopyWebpackPlugin = require('copy-webpack-plugin'); // 复制文件
const ImageminPlugin = require('imagemin-webpack-plugin').default; // 压缩图片
const mozjpeg = require('imagemin-mozjpeg'); // 压缩jpg

const app = require('./src/app.json');

// 自定义
const config = {
  pageInherit: true, // 页面文件名是否继承文件夹名
  compInherit: false, // 组件文件名是否继承文件夹名
  compDir: 'component', // 组件文件夹名
};

// 配置选项
const opt = {
  context: path.join(__dirname, 'src'),
  entry() {
    return {};
  },
  module: {
    rules: [],
  },
  plugins: [
    // 复制文件
    new CopyWebpackPlugin([
      {
        from: './NextGen/*',
      },
    ]),

    new ImageminPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      pngquant: { quality: '65-90' },
      plugins: [mozjpeg({ quality: 80 })],
    }),
  ],
};
module.exports = env => opt;
