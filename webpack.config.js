const path = require('path');

module.exports = {
  entry: [
    path.resolve(__dirname, 'index.ts'),
    path.resolve(__dirname, 'resources', 'scss', 'main.scss')
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: [".ts", ".js", ".json", ".jsx", ".css"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      }
    ]
  }
}
