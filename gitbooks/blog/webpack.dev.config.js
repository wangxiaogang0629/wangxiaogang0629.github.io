
const path = require('path');
const webpack = require('webpack');

const config = {
  entry: {
    home: './src/js/app.js',
  },

  output: {
    path: path.resolve(__dirname, './public/js/'),
    filename: '[name].js'
  },

  // devServer: {
  //   contentBase: __dirname + '/public',
  //   compress: true,
  //   port: 9000
  // },

  module: {
    rules: [
      {
        test: /(\.js|\.jsx)$/,
        use: {
          loader: 'babel-loader?cacheDirectory',
          options: {
            presets: ['babel-preset-env', 'babel-preset-react', 'babel-preset-stage-1']
          }
        }
      },
      {
        test: /(\.css|\.scss)$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'sass-loader',
          }
        ]
      },
    ]
  },

};

module.exports = config;
