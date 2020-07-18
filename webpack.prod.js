var path = require('path');
const common = require("./webpack.common");
var { merge } = require("webpack-merge");
const webpack = require("webpack");

module.exports = merge(common, {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/main.[contentHash].js'
  },
  plugins: [new webpack.DefinePlugin({
    BASE_PATH : JSON.stringify('public/'),
  })]
});