var path = require('path');
var webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin")

const entry = {
  gcd: "./src/gcdProgram.jsx",
  combiner: "./src/polynomialCombiner.jsx",
  inverse: "./src/inverseFinder.jsx"
}

const plugins = Object.keys(entry).map(key => 
	new HtmlWebpackPlugin({
		title: key.toUpperCase(),
		template: "./src/template.html",
		filename: `${key}.html`,
		inject: false,
		chunks: [key]
	})
)

module.exports = {
  entry: entry,
  output: {
	  filename: "[name].js",
	  path: __dirname + "/dist"
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /.jsx$/,
		exclude: /node_modules/,
		use: ["babel-loader"]
      },
    ],
  },
  plugins: plugins
}
