const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, '/src'),
  dist: path.join(__dirname, '/dist'),
  assets: '/assets',
};

module.exports = (env, options) => {

  const isProdaction = options.mode === 'production';

  const config = {
    externals: {
      paths: PATHS,
    },
    mode: isProdaction ? 'production' : 'development',
    devtool: isProdaction ? 'none' : 'source-map',
    watch: !isProdaction,
    entry: [`${PATHS.src}/index.js`, `${PATHS.src}/style/style.css`],
    output: {
      filename: 'main.js',
      path: PATHS.dist,
    },
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.js$/,
          loader: 'eslint-loader',
        },
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.(png|jpe?g|svg|gif)$/,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        },
        {
          test: /\.html$/,
          loader: 'html-loader',
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new CopyWebpackPlugin([
        {
          context: path.resolve(__dirname, 'src'),
          from: `${PATHS.src}/assets/img`,
          to: `${PATHS.assets}/img`,
        },
        {
          context: path.resolve(__dirname, 'dist'),
          from: `${PATHS.src}/assets/audio`,
          to: `${PATHS.assets}/audio`,
        },
      ]),
      new HtmlWebpackPlugin({
        template: 'index.html',
      }),
      new MiniCssExtractPlugin({
        filename: 'style.css',
      }),
    ],
    devServer: {
      inline: true,
      port: 10000,
    },
  };

  return config;
}
