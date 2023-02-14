const FileManagerPlugin = require('filemanager-webpack-plugin');
module.exports = {
  plugins: [
    new FileManagerPlugin({
     events: {
       onStart: {
         delete: ['dist'],
       },
     },
   }),
  ]
}