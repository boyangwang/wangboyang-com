const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
    'bundle.js': path.resolve(__dirname, 'public/js/index.js'),
  },
  output: {
    filename: '[name]',
    path: path.resolve(__dirname, 'public/build/'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: { loader: 'css-loader', options: { minimize: true } }
        })
      },
      {test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream'},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml'},
      {test: /\.(jpg|jpeg|png|gif)$/, loader: 'file-loader'},
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public/'),
    compress: true,
    port: 14401,
    publicPath: '/build',
    hot: true,
    inline: true
  },
  plugins: [
    // new CleanWebpackPlugin([path.resolve(__dirname, 'public/build/*.*')]),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin("styles.css"),
    new UglifyJsPlugin(),
  ],
};