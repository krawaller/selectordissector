var path = require("path");
var WebpackNotifierPlugin = require('webpack-notifier');

module.exports = {
  devtool: 'eval',
  entry: __dirname + '/src/app/index.tsx',
  output: {
    path: __dirname + '/dist/',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: [".tsx",".ts",".js"]
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      loader: 'ts-loader',
      exclude: /node_modules/
    }]
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 9000
  },
  plugins: [
    new WebpackNotifierPlugin({alwaysNotify: true})
  ]
};
