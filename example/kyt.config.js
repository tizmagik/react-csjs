const path = require('path');

module.exports = {
  reactHotLoader: true,
  modifyWebpackConfig: (kytConfig, options) => {
    kytConfig.resolve.alias = {
      'react-csjs': path.resolve('../src/index.js')
    }

    const babelLoader = kytConfig.module.loaders.find(loader => loader.loader === 'babel-loader');
    babelLoader.query.presets = ["es2015", "react", "stage-0"];
    babelLoader.query.plugins.push(require.resolve('babel-plugin-transform-decorators-legacy'));

    return kytConfig;
  }
};
