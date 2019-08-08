const merge = require("webpack-merge");
const path = require("path");
const common = require("./webpack.common.js");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    port: 3042,
    historyApiFallback: true,
    overlay: true,
    open: true,
    stats: "errors-only"
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        include: [
          path.resolve(__dirname, "../src/assets"),
          path.resolve(__dirname, "../node_modules")
        ],
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      }
      /*{                      uncomment this to run eslint in runtime
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: { loader: "babel-loader" }
      },
      {
        //enforce: "pre",
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: { loader: "eslint-loader" }
      }*/
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css"
    })
  ]
});
