//Подробные настройки см тут https://github.com/GeorgeSemenov/tesJobHouseofTheSites/blob/master/webpack.config.js
const { merge } = require('webpack-merge');
const path      = require('path');
const pages     = require('./webpack/pages');
const getCommon = require('./webpack/common');
const inlineCSS = require('./webpack/inlineCSS');
const files     = require('./webpack/files')

module.exports = function(env,argv){
  const common = getCommon(__dirname)
  if(argv.mode === 'production'){
    common.devtool = false;//сорсмап создаваться не будет
    common.output.publicPath = "./"; //Указываем нормальный пукть, чтобы сборка была человеческой
    return merge([
      common,
      inlineCSS,
    ])
  }
  if(argv.mode === 'development'){
    common.devtool = 'source-map';//Будет создаваться сорсмап, это значит, что когда ты вызовешь инструмент разработчика в браузере и посмотрищь на свойства элемента, то там будет прописанно, в каком конкретно файле прописанно это свойства, если не указать сорсмап, то все свйоства будут храниться в inline, т.к. в режиме разработки мы сохраняем их туда.
    return merge([
      common,
      inlineCSS,
    ])
  }
};