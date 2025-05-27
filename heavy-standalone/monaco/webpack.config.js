const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");

const LANGUAGES = [
  "c",
  "cpp",
  "css",
  "dockerfile",
  "go",
  "graphql",
  "handlebars",
  "html",
  "javascript",
  "json",
  "markdown",
  "powershell",
  "python",
  "rust",
  "scss",
  "shell",
  "sql",
  "typescript",
  "xml",
  "yaml",
];

module.exports = (_, argv) => {
  const isDev = argv.mode === "development";

  return {
    mode: isDev ? "development" : "production",
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "monaco.min.js", //isDev ? "bundle.js" : "bundle.[contenthash].js",
      chunkFilename: "js/bundle.[contenthash].js", // dynamic imports / chunks
      assetModuleFilename: "assets/[name][ext]", // for fonts, wasm, etc.
      globalObject: "self",
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.ttf$/,
          type: "asset/resource",
        },
        {
          test: /\.wasm$/,
          type: "asset/resource",
        },
      ],
    },
    optimization: {
      minimize: !isDev,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: true,
            mangle: true,
            format: {
              comments: false,
            },
          },
          extractComments: false,
        }),
      ],
      splitChunks: false,
      runtimeChunk: false,
    },
    plugins: [
      new WebpackManifestPlugin({
        fileName: "manifest.json",
      }),
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        filename: "index.html",
        minify: !isDev
          ? {
              removeComments: true,
              collapseWhitespace: true,
              removeAttributeQuotes: true,
              useShortDoctype: true,
            }
          : false,
      }),
      ...(isDev
        ? [
            new CopyWebpackPlugin({
              patterns: [{ from: "public", to: "." }],
            }),
          ]
        : []),
      new MonacoWebpackPlugin({
        filename: "js/monaco.[name].[contenthash].worker.js",
        globalAPI: false,
        languages: LANGUAGES,
      }),
      // !isDev && new CompressionPlugin({ algorithm: 'brotliCompress' }), // Optional
    ].filter(Boolean),
    devServer: {
      static: {
        directory: path.join(__dirname, "dist"),
      },
      compress: true,
      port: 9000,
    },
    resolve: {
      extensions: [".js", ".json"],
      fallback: {
        fs: false,
        path: false,
      },
    },
  };
};
