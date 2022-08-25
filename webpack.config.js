/**
 * Webpack main configuration file
 */

const path = require('path');
const fs = require('fs');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const environment = require('./configuration/environment');

const templateFiles = fs.readdirSync(environment.paths.source)
  .filter((file) => ['.html', '.ejs'].includes(path.extname(file).toLowerCase())).map((filename) => ({
    input: filename,
    output: filename.replace(/\.ejs$/, '.html'),
  }));

const htmlPluginEntries = templateFiles.map((template) => new HTMLWebpackPlugin({
  inject: true,
  hash: false,
  filename: template.output,
  template: path.resolve(environment.paths.source, template.input),
}));

module.exports = {
  entry: {
    app: path.resolve(environment.paths.source, 'app.js'),
  },
  output: {
    filename: '[name][chunkhash].js',
    path: environment.paths.output,
  },
  resolve: {
    // Shortcut to fast input in import
    alias: {
      '@shaders': path.resolve(environment.paths.source, 'shaders'),
    },
  },
  module: {
    rules: [
      {
        test: /\.((c|sa|sc)ss)$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(png|gif|jpe?g|svg)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: environment.limits.images,
          },
        },
        generator: {
          filename: 'images/[name].[hash:6][ext]',
        },
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: environment.limits.images,
          },
        },
        generator: {
          filename: 'images/[name].[hash:6][ext]',
        },
      },
      {
        test: /\.(glsl|frag|vert)$/,
        loader: 'raw-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(glsl|frag|vert)$/,
        loader: 'glslify-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name][chunkhash].css',
    }),
    new CleanWebpackPlugin({
      verbose: true,
      cleanOnceBeforeBuildPatterns: ['**/*', '!stats.json'],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(environment.paths.source, 'assets'),
          to: path.resolve(environment.paths.output, 'assets'),
          toType: 'dir',
          noErrorOnMissing: true,
          globOptions: {
            ignore: ['*.DS_Store', 'Thumbs.db'],
          },
        },
      ],
    }),
  ].concat(htmlPluginEntries),
  target: 'web',
};
