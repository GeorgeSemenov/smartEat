const path = require('path');

module.exports = function(dirname)
{
  return {
    devServer: {
      watchFiles: path.join(dirname, 'src'),
      port: 9004,
    },
  }
}