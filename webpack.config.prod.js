// const merge = require('webpack-merge');
// const baseWebpackConfig = require('./webpack.config.base');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
// const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
// const path = require('path');

// const glob = require("glob")

// // glob(path.join(__dirname, '../js/bee/*.js*'),function (er, files) {
// //   console.log(files)
// // });
// //entries.vendors = getVendors();
// let entry = {
// };
// glob.sync(path.join(__dirname, './js/refs/*.js*')).forEach(filepath => {
//   let pathStr = filepath.split('/');
//   let entryName = pathStr.pop().toLocaleLowerCase().replace(/(.js)|(.jsx)$/, '');
//   entry[`refs/${entryName}`] = filepath;
// });
// glob.sync(path.join(__dirname, './js/bee/*.js*')).forEach(filepath => {
//   let pathStr = filepath.split('/');
//   let entryName = pathStr.pop().toLocaleLowerCase().replace(/(.js)|(.jsx)$/, '');
//   entry[`bee/${entryName}`] = filepath;
// });
// glob.sync(path.join(__dirname, './js/utils/*.js*')).forEach(filepath => {
//   let pathStr = filepath.split('/');
//   let entryName = pathStr.pop().toLocaleLowerCase().replace(/(.js)|(.jsx)$/, '');
//   entry[`utils/${entryName}`] = filepath;
// });

// module.exports = merge(baseWebpackConfig, {
//     mode: 'production',
//     entry: entry,
//     output: {
//         path: path.resolve(__dirname, 'lib'),
//         filename: '[name].js',
//         publicPath: "/",
//         libraryTarget: 'umd',
//         library: 'expression'
//     },
//     externals:['react','react-dom','tinper-bee'],
//     plugins: [
//         new CleanWebpackPlugin(['lib']),
//         new MiniCssExtractPlugin({
//           filename: "[name].css",
//         })
//     ],
//     optimization: {
//       minimizer: [
//         new UglifyJsPlugin({
//           cache: true,
//           parallel: true,
//           sourceMap: true
//         }),
//         new OptimizeCSSAssetsPlugin({})  // use OptimizeCSSAssetsPlugin
//       ],
//     }
// });



