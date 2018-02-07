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
  }
};