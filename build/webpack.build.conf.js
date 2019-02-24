const merge = require('webpack-merge'),
  baseWebpackConfig = require('./webpack.base.config'),
  ImageminPlugin = require('imagemin-webpack-plugin').default,
  imageminMozjpeg = require('imagemin-mozjpeg');


const buildWebpackConfig = merge(baseWebpackConfig, {
    mode: 'production',
    plugins: [
      new ImageminPlugin({
        test: /\.(jpe?g|png|gif|svg)$/i,
        pngquant: {quality: '50'},
        svgo: true,
        plugins: [imageminMozjpeg({quality: '50'})]
      })
    ]
  });

module.exports = new Promise((resolve,reject) => {
  resolve(buildWebpackConfig);
});