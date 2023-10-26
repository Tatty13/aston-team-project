const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const Dotenv = require('dotenv-webpack')

const PATHS = {
  src: path.join(__dirname, 'src'),
  dist: path.resolve(__dirname, 'dist'),
  public: path.resolve(__dirname, 'public'),
}

const getPlugins = () => {
  return [
    new HTMLWebpackPlugin({
      title: 'Production',
      template: path.resolve(PATHS.public, 'index.html'),
      favicon: path.resolve(PATHS.public, 'favicon.png'),
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(PATHS.public, '404.html'),
          to: path.resolve(PATHS.dist, '404.html'),
        },
      ],
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new Dotenv(),
  ]
}

const getRules = () => {
  return [
    {
      test: /\.ts(x?)?$/,
      use: 'babel-loader',
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
      test: /\.(ttf|woff(2)?)$/,
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
    extensions: ['.ts', '.js', '.tsx', '...'],
    alias: {
      '@src': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@app': path.resolve(__dirname, 'src/app'),
      '@api': path.resolve(__dirname, 'src/app/api'),
      '@constants': path.resolve(__dirname, 'src/app/constants'),
      '@HOC': path.resolve(__dirname, 'src/app/HOC'),
      '@hooks': path.resolve(__dirname, 'src/app/hooks'),
      '@vendor': path.resolve(__dirname, 'src/app/vendor'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@store': path.resolve(__dirname, 'src/store'),
      '@types': path.resolve(__dirname, 'src/types'),
    },
  },
}
