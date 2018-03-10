/* tslint:disable object-literal-sort-keys */

const path = require("path");
const WebpackNotifierPlugin = require("webpack-notifier");

module.exports = {
  mode: "production",
  entry: __dirname + "/src/app/index.tsx",
  output: {
    path: __dirname + "/dist/",
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  optimization: {
    minimize: true,
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      loader: "ts-loader",
      include: path.resolve(__dirname, "src"),
      exclude: /node_modules/,
    }],
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 9000,
  },
  plugins: [
    new WebpackNotifierPlugin({alwaysNotify: true}),
  ],
};
