//Подробные настройки см тут https://github.com/GeorgeSemenov/tesJobHouseofTheSites/blob/master/webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const pages = require('./webpack/pages');

// const page = "index";

module.exports = {
  // entry: path.join(__dirname, 'src', 'index.js'),
  entry:pages.reduce((config,page)=>{//reduce используется вместо map, т.к. entry должен принимать объект с полями и значениями, имя поля затем будет использовться в output, если там указан [name], если entry не будет принимать объект, то будет создаваться файл main.js вместо [name].js
    config[page] = path.join(__dirname, `src/pages/${page}`, `${page}.js`);
    return config;
  },{}),//второй аргумент reduce - это начальное значение для суммарного объекта config
  // entry: pages.map(page=>path.join(__dirname, `src/pages/${page}`, `${page}.js`)),
  // entry: path.join(__dirname, `src/pages/${page}`, `${page}.js`),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    assetModuleFilename: path.join('images', '[name].[contenthash][ext]'),
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: 'pug-loader',
      },
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.svg$/,
        type: 'asset/resource',
        generator: {
          filename: path.join('icons', '[name].[contenthash][ext]'),
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ]
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //   template: path.join(__dirname, 'src', 'template.pug'),
    //   filename: 'index.html',
    // }),
    // new HtmlWebpackPlugin({
    //   template: path.join(__dirname, `src/pages/${page}`, `${page}.pug`),
    //   filename: `${page}.html`,
    // }),
    new FileManagerPlugin({
     events: {
       onStart: {
         delete: ['dist'],
       },
     },
   }),
  ].concat(pages.map(
    page=>{
        return new HtmlWebpackPlugin({
          template: path.join(__dirname, ('src/pages/' + page), (page + '.pug')),
          filename: (page + '.html'),
        })
      }
    )
  ),
  devServer: {
    watchFiles: path.join(__dirname, 'src'),
    port: 9004,
  },
};