const path = require('path')
const env = require('dotenv')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')

const BuildConfig = {
  path: {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    dist: path.resolve(__dirname, 'dist'),
    html: path.resolve(__dirname, 'public', 'index.html'),
    src: path.resolve(__dirname, 'src'),
    favicon: path.resolve(__dirname, 'public', 'favicon.png'),
  },
}

const getRules = () => {
  return [
    {
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/,
    },
    {
      test: /\.(css|scss)$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
    },
    {
      test: /\.(png|jpg|gif|jpeg)$/,
      use: ['file-loader'],
    },
    {
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    },
  ]
}

const getPlugins = () => {
  return [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: BuildConfig.path.html,
      favicon: BuildConfig.path.favicon,
    }),
  ]
}

module.exports = {
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    historyApiFallback: true,
  },
  entry: BuildConfig.path.entry,
  devtool: 'inline-source-map',
  output: {
    path: BuildConfig.path.dist,
    filename: '[name].[hash].js',
  },
  resolve: {
    extensions: ['.ts', '.js', '.tsx'],
  },
  plugins: getPlugins(),
  module: {
    rules: getRules(),
  },
}
