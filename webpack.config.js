const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin")

const entry = {
  index: "./src/index.jsx"
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
        test: /.jsx?$/,
		exclude: /node_modules/,
		include: path.resolve(__dirname, "src"),
		use: ["babel-loader"]
      },
    ],
  },
  plugins: plugins
}
