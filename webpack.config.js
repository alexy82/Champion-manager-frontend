const webpack = require("webpack")
const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const BUILD_DIR = path.resolve(__dirname, "build")
const SRC_DIR = path.resolve(__dirname, "app")
module.exports = env => {
  let config = {
    stats: "errors-only",
    entry: ["@babel/polyfill", SRC_DIR + "/index.js"],
    output: {
      path: BUILD_DIR,
      filename: "[name].bundle.js"
    },
    mode: env && env.production ? "production" : "development",
    devServer: {
      host: "nhan-vien-phong-vu-web-app.phongvu.vn",
      contentBase: BUILD_DIR,
      compress: true,
      hot: true,
      open: true,
      disableHostCheck: true,
      overlay: true
    },
    module: {
      rules: [
        {
          enforce: "pre",
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "eslint-loader",
          options: {
            failOnWarning: false,
            failOnError: true
          }
        },
        {
          test: /\.(js|jsx)$/,
          include: [path.resolve(__dirname, "app")],
          use: {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-flow"],
              plugins:
                env && env.production
                  ? ["@babel/plugin-syntax-dynamic-import", "transform-class-properties", "transform-remove-console"]
                  : ["@babel/plugin-syntax-dynamic-import", "transform-class-properties"]
            }
          }
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            "style-loader",
            // Translates CSS into CommonJS
            "css-loader",
            // Compiles Sass to CSS
            "sass-loader"
          ]
        },
        {
          test: /\.(css)$/,
          use: ["style-loader", "css-loader"]
        },
        {
          test: /\.(png|jpg|jpeg|gif|ico)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "./img/[name].[hash].[ext]"
              }
            }
          ]
        },
        {
          test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]",
                outputPath: "fonts/"
              }
            }
          ]
        },
        {
          test: /\.svg$/,
          loader: "svg-inline-loader"
        }
      ]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        inject: true,
        template: "./public/index.html"
      })
      // new CompressionPlugin({ algorithm: 'gzip', deleteOriginalAssets: true }),
      // new BundleAnalyzerPlugin()
    ]
  }
  if (!env || !env.production) {
    config.devtool = "cheap-module-eval-source-map"
  } else {
    config.optimization = {
      splitChunks: {
        chunks: "all"
      },
      minimize: true
    }
  }
  return config
}
