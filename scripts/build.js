process.on("unhandledRejection", err => {
  throw err;
});

const webpack = require("webpack");
const resolve = require("resolve");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const chalk = require("react-dev-utils/chalk");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin-alt");
const typescriptFormatter = require("react-dev-utils/typescriptFormatter");
const paths = require("./config/path.js");

console.log(chalk.cyan("正在打包..."));

module.exports = {
  mode: "production",
  devtool: "source-map",
  entry: {
    vendor: ["react", "react-dom", "react-router-dom", "mobx", "mobx-react"],
    path: path.resolve(__dirname, "../src/index.tsx")
  },
  output: {
    filename: "static/js/[name].[contenthash].js",
    chunkFilename: "static/js/[name].[contenthash].js",
    path: paths.appDist
  },
  module: {
    rules: [
      { parser: { requireEnsure: false } },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "babel-loader"
      },
      {
        test: /\.tsx?$/,
        include: paths.appSrc,
        loader: "ts-loader"
      },
      {
        test: /\.css$/,
        include: [paths.appSrc, `${paths.appNodeModules}/antd/es/`],
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.s[ac]ss$/,
        exclude: /\.module\.s[ac]ss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      },
      {
        test: /\.(txt|htm)$/,
        include: paths.appSrc,
        loader: "raw-loader"
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: "file-loader",
        options: {
          name: "static/images/[name].[hash:8].[ext]"
        }
      },
      {
        test: /\.(mp4|webm|wav|mp3|m4a|aac|oga)$/,
        loader: "file-loader",
        options: {
          name: "static/media/[name].[hash:8].[ext]"
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"]
      }
    ]
  },
  resolve: {
    alias: paths.alias,
    extensions: [".wasm", ".mjs", ".tsx", ".ts", ".js", ".jsx", ".json"]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks: {
      chunks: "async",
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: "~",
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        styles: {
          name: "styles",
          test: /\.css$/,
          chunks: "all",
          enforce: true
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    },
    runtimeChunk: "single"
  },
  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    module: "empty",
    dgram: "empty",
    dns: "mock",
    fs: "empty",
    net: "empty",
    tls: "empty",
    child_process: "empty"
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "static/css/[name].[hash].css",
      chunkFilename: "static/css/[id].[hash].css"
    }),
    new HtmlWebpackPlugin({
      title: "Hello React",
      template: path.resolve(__dirname, "../public/index.html")
    }),
    new webpack.HashedModuleIdsPlugin(),
    new ForkTsCheckerWebpackPlugin({
      typescript: resolve.sync("typescript", {
        basedir: paths.appNodeModules
      }),
      async: false,
      checkSyntacticErrors: true,
      tsconfig: paths.appTsConfig,
      compilerOptions: {
        module: "esnext",
        moduleResolution: "node",
        resolveJsonModule: true,
        isolatedModules: true,
        noEmit: true,
        jsx: "preserve"
      },
      reportFiles: [
        "**",
        "!**/*.json",
        "!**/__tests__/**",
        "!**/?(*.)(spec|test).*",
        "!**/src/setupProxy.*",
        "!**/src/setupTests.*"
      ],
      watch: paths.appSrc,
      silent: true,
      formatter: typescriptFormatter
    })
  ],
  performance: false
};
