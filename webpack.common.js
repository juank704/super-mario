const path = require('path');

var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: './public/js/main.js',
  plugins:[
    new HtmlWebpackPlugin({
      template: "./public/js/template.html",
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
    ]
  },
  
  
};