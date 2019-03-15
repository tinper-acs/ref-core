const path = require('path')
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  output: {
    path: path.join(__dirname, '../lib'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      components: path.resolve(__dirname, "src/components/"),
      assets: path.resolve(__dirname, "src/assets/"),
      containers: path.resolve(__dirname, "src/containers/")
    }
  },
  module: {
    rules: [
      {
        test: /.jsx$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/,
      },
      {
        test: /.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/,
      },
      
      {
        test: /\.(png|jpg|jpeg|gif)(\?.+)?$/,
        exclude: /favicon\.png$/,
        use: [{
          loader: "url-loader",
          options: {
            limit: 10000,
            name: "[name].[hash:8].[ext]"
          }
        }]
      },
      {
        test: /\.(eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        use: [{
          loader: "file-loader",
          options: {
            name: "[name].[hash:8].[ext]"
          }
        }]
      }
    ]
  },
}
