const path =                require('path');
const ExtractTextPlugin =   require('extract-text-webpack-plugin');
const autoprefixer =        require('autoprefixer');

module.exports = {
  entry: [
    path.resolve(__dirname, 'index.ts'),
    path.resolve(__dirname, 'resources', 'scss', 'main.scss')
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/bundle.js'
  },
  resolve: {
    extensions: [".ts", ".js", ".json", ".jsx", ".css"],
    alias: {
      _scss: path.resolve(__dirname, 'resources', 'scss')
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css-loader!sass-loader!postcss-loader'),
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'css/[name].css',
      allChunks: true,
    })
  ]
}
