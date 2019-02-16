const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

const LodashModuleReplacementPlugin = require('lodash-webpack-plugin'); // lodash
const sass = require('node-sass'); // scss
const CopyWebpackPlugin = require('copy-webpack-plugin'); // 复制文件
const ImageminPlugin = require('imagemin-webpack-plugin').default; // 压缩图片
const mozjpeg = require('imagemin-mozjpeg'); // 压缩jpg

// 自定义
const config = {
  srcDir: './src', // 入口文件夹路径
  distDir: './dist', // 出口文件夹路径
  compDir: ['components'], // 组件文件夹路径
};

// 获取所有页面入口
const app = require(`${config.srcDir}/app.json`);
const pages = () => {
  const list = app.pages.reduce((pv, cv) => {
    const obj = pv;
    const str = `./${cv}`;
    obj[str] = str;
    return obj;
  }, {});

  return list;
};

// 获取所有组件入口
const comps = () => {
  const list = config.compDir.reduce((all, dir) => {
    const dirs = fs.readdirSync(`${config.srcDir}/${dir}`);
    const item = dirs.reduce((pv, cv) => {
      const srcPath = `./${dir}/${cv}`; // 获取目录名
      const rootPath = path.join(config.srcDir, srcPath);
      const stats = fs.statSync(rootPath);
      if (stats.isFile()) return pv; // 如果为文件则终止

      const obj = pv;
      const files = fs.readdirSync(rootPath); // 获取文件列表

      files.forEach((i) => {
        if (i === 'index.js') {
          // 文件名为index
          obj[`${srcPath}/index`] = srcPath;
        } else if (i === `${cv}.js`) {
          // 文件名继承文件夹名
          const name = `${srcPath}/${cv}`;
          obj[name] = name;
        }
      });

      return obj;
    }, {});

    return {
      ...all,
      ...item,
    };
  }, {});

  return list;
};
/*
const comps = () => {
  const dirs = app.pages;
  const compSet = dirs.reduce((pv, cv) => {
    const src = path.join(config.srcDir, cv);
    const json = require(`./${src}.json`);
    const comp = Object.values(json.usingComponents);
    const set = new Set([...pv, ...comp]);
    return set;
  }, []);

  const list = [...compSet].reduce((pv, cv) => {
    const obj = pv;
    const src = path.join('./', './src/components', cv);
    obj[`./${src}`] = `./${src}`;
    return obj;
  }, {});

  return list;
};
 */
// 配置选项
const opt = {
  context: path.join(__dirname, config.srcDir),
  entry: {
    app: './app',
    ...pages(),
    ...comps(),
  },
  output: {
    path: path.join(__dirname, config.distDir),
  },

  watchOptions: { ignored: /node_modules/ },

  module: {
    rules: [
      {
        include: path.join(__dirname, config.srcDir),
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: ['@babel/plugin-transform-runtime', 'lodash'],
        },
      },
    ],
  },

  plugins: [
    new LodashModuleReplacementPlugin(), // lodash

    // 复制文件
    new CopyWebpackPlugin([
      {
        from: '**/*',
        ignore: ['*.sass', '*.scss', '*.js', '*.v*.*'],
      },
      {
        from: '**/*.s*ss',
        to: '[path][name].wxss',
        transform(content) {
          const data = content.toString('binary');
          const res = sass.renderSync({
            data,
            outputStyle: 'compressed',
          });
          return res.css;
        },
      },
    ]),
  ],
};

module.exports = (env) => {
  // 环境选项
  if (env === 'dev') {
    opt.mode = 'development';
    opt.devtool = 'source-map-inline-cheap-module';
    opt.watch = true;
  } else {
    opt.mode = 'production';

    // 压缩图片
    opt.plugins.push(
      new ImageminPlugin({
        test: /\.(jpe?g|png|gif|svg)$/i,
        pngquant: { quality: '65-90' },
        plugins: [mozjpeg({ quality: 80 })],
      }),
    );
  }

  return opt;
};
