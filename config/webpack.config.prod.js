const path = require('path')
const glob = require("glob")
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const baseConfig = require('./webpack.base')
let entry = {
};
glob.sync(path.join(__dirname, '../src/js/refs/*.js*')).forEach(filepath => {
  let pathStr = filepath.split('/');
  let entryName = pathStr.pop().toString().replace(/(.js)|(.jsx)$/, '');
  entry[`refs/${entryName}`] = filepath;
});
glob.sync(path.join(__dirname, '../src/js/utils/*.js*')).forEach(filepath => {
  let pathStr = filepath.split('/');
  let entryName = pathStr.pop().toString().replace(/(.js)|(.jsx)$/, '');
  entry[`utils/${entryName}`] = filepath;
});

module.exports = webpackMerge(baseConfig, {
  mode:'production',
  entry: entry,
  externals:['react','react-dom','prop-types','tinper-bee'],
  output: {
      filename: '[name].js',
      path: path.join(__dirname, '../lib'),
      publicPath: '/',
      libraryTarget: 'umd',
      library: 'expression'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
          },
          "sass-loader"
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
          },
          "less-loader"
        ]
      }
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({})  // use OptimizeCSSAssetsPlugin
    ], // [new UglifyJsPlugin({...})]
  },
  plugins: [
      new webpack.DefinePlugin({
          'process.env': {
            'NODE_ENV':  JSON.stringify('production')
          }
      }),
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: "[name].css",
      })
  ]
})





