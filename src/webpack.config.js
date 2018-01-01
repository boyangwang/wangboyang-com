const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

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
    port: 14401
  },
  plugins: [
    new ExtractTextPlugin("styles.css"),
    new UglifyJsPlugin(),
  ],
};