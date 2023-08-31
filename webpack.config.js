const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
  const dev = true;
  const enableSourceMap = dev;

  return {
    plugins: [
      new HtmlWebpackPlugin(),
    ],
    entry: {
      main: "./src/main.js",
    },
    output: {
      filename: "assets/js/[name].js",
      path: path.resolve("dist"),
    },
    module: {
    },
    devtool: enableSourceMap ? "cheap-module-source-map" : false,
  };
};
