const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const PATHS = {
  src: path.join(__dirname, 'src'),
  dist: path.resolve(__dirname, 'dist'),

  html: path.resolve(__dirname, 'public', 'index.html'),
  favicon: path.resolve(__dirname, 'public', 'favicon.png'),
}

const getPlugins = () => {
  return [
    new HTMLWebpackPlugin({
      title: 'Production',
      template: PATHS.html,
      favicon: PATHS.favicon,
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
  ]
}

const getRules = () => {
  return [
    {
      test: /\.ts(x?)?$/,
      use: 'ts-loader',
      exclude: /node_modules/,
    },
    {
      test: /\.(css|scss)$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: { importLoaders: 1 },
        },
        'postcss-loader',
        'sass-loader',
      ],
      exclude: /node_modules/,
    },
    {
      test: /\.(png|jpg|gif|jpeg)$/,
      type: 'asset/resource',
      exclude: /node_modules/,
      generator: {
        filename: 'assets/[name]-[hash][ext]',
      },
    },
    {
      test: /\.(woff(2)?)$/,
      type: 'asset/resource',
      exclude: /node_modules/,
      generator: {
        filename: 'fonts/[name]-[hash][ext]',
      },
    },
    {
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    },
  ]
}

module.exports = {
  externals: {
    paths: PATHS,
  },
  entry: {
    app: path.join(PATHS.src, '/index.tsx'),
  },
  output: {
    filename: 'js/[chunkhash].js',
    path: PATHS.dist,
    clean: true,
  },
  plugins: getPlugins(),
  module: {
    rules: getRules(),
  },
  resolve: {
    extensions: ['.ts', '.js', '.tsx'],
  },
}
