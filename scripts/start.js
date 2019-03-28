process.on("unhandledRejection", err => {
  throw err;
});

const webpack = require("webpack");
const resolve = require("resolve");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const chalk = require("react-dev-utils/chalk");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin-alt");
const typescriptFormatter = require("react-dev-utils/typescriptFormatter");
const paths = require("./config/path.js");

console.log(chalk.cyan("正在启动环境..."));

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: {
    vendor: ["react", "react-dom", "react-router-dom", "mobx", "mobx-react"],
    path: path.resolve(__dirname, "../src/index.tsx")
  },
  output: {
    filename: "static/js/[name].[hash:8].js",
    chunkFilename: "static/js/[name].[hash:8].js",
    path: paths.appDist
  },
  module: {
    rules: [
      // Disable require.ensure as it's not a standard language feature.
      { parser: { requireEnsure: false } },
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        include: paths.appSrc,
        use: ["babel-loader", "ts-loader"]
      },
      {
        test: /\.css$/,
        include: [paths.appSrc, `${paths.appSrc}/antd/es/`],
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.s[ac]ss$/,
        include: paths.appSrc,
        use: ["style-loader", "css-loader", "sass-loader"]
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
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    open: false,
    hot: true,
    compress: true,
    port: 9000,
    quiet: true,
    overlay: true // 编译出现错误时，将错误直接显示在页面上
  },
  resolve: {
    alias: paths.alias,
    extensions: [".wasm", ".mjs", ".ts", ".tsx", ".js", ".json"]
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
    new HtmlWebpackPlugin({
      title: "Hello React",
      template: path.resolve(__dirname, "../public/index.html")
    }),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [
          `Local: ${0 ? "https" : "http"}://localhost:9000`,
          `On Your Network: ${0 ? "https" : "http"}://localhost:9000`
        ]
      },
      onErrors: null,
      clearConsole: true
    }),
    new webpack.HotModuleReplacementPlugin(),
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
