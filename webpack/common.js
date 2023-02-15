const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const pages = require('./pages');

module.exports = function(dirname){
  return {
    entry:pages.reduce((config,page)=>{//reduce используется вместо map, т.к. entry должен принимать объект с полями и значениями, имя поля затем будет использовться в output, если там указан [name], если entry не будет принимать объект, то будет создаваться файл main.js вместо [name].js
      config[page] = path.join(dirname, `src/pages/${page}`, `${page}.js`);
      return config;
    },{}),//второй аргумент reduce - это начальное значение для суммарного объекта config
    output: {
      path: path.join(dirname, 'dist'),
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
    plugins: [].concat(pages.map(
      page=>{
          return new HtmlWebpackPlugin({
            template: path.join(dirname, ('src/pages/' + page), (page + '.pug')),
            filename: (page + '.html'),
            chunks: [page],//Эта запись выбирает повторяющиеся зависимости из файлов и выписывает его в отдельный файл, к томуже Добавляет на страницу только те файлы, которые начинаются с index (допустим index.js index.css даже несмотря на то что они находятся в отельных папках css/ и js/)
          })
        }
      )
    ),
    optimization:{
      splitChunks:{
        chunks: 'all',//Указывает какие чанки (модули с используемым кодом) будут оптимизироваться (удалятся повторяющийся код и выносится в другой файл), возможные значения 'all'(проверяет все чанки) 'async'(Проверяет только асинхронные) 'initial'
        name: 'common'//Файлы с общим кодом будут называться common.js и common.css, если имя не написать, то там будет vendor~index~blog.js или (css) 
      }
    },
  };
}