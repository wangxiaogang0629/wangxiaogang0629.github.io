var webpack = require('webpack');
var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  mode: 'development',
  entry: './src/js/app.js',
  output: {
     path: path.resolve(__dirname + '/dist'),
     filename: "bundle.js"
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['env', 'react']
        }
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader',
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      }
    ],
  },
  plugins: [
      new HtmlWebpackPlugin({
          template: './index.html', //指定模板路径
          filename: 'index.html', //指定文件名
      })
  ]
};
