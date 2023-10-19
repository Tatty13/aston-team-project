const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    static: common.externals.paths.dist,
    compress: true,
    historyApiFallback: true,
    open: true,
    port: 5000,
    liveReload: true,
  },
  devtool: 'inline-source-map',
})
