var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
	  gcd: "./src/gcdProgram.jsx"
  },
  output: {
	  filename: "[name].js",
	  path: __dirname + "/dist"
  },
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
