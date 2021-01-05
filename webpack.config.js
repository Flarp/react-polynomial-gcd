var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: path.resolve(__dirname, "./src/main.jsx"),	
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /.jsx?$/,
		exclude: /node_modules/,
		use: ["babel-loader"]
      },
    ],
  }
}
