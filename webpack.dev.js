const path = require('path');
const common = require("./webpack.common");
const { merge } = require("webpack-merge");
const webpack = require("webpack");


module.exports = merge(common, {
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/main.js',
  },
  plugins: [new webpack.DefinePlugin({
    BASE_PATH : JSON.stringify("public/"),
  })]
});