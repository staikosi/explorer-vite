const path = require('path');

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.join(__dirname, 'src')
      }
    }
  },
  devServer: {
    disableHostCheck: true
  },
  publicPath: './'
};
