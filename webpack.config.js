const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const path = require("path");

const mode =
  process.env.NODE_ENV === "production" ? "production" : "development";
const target = process.env.NODE_ENV === "production" ? "browserslist" : "web";

module.exports = {
  mode: mode,
  target: target,
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    open: true,
    hot: true,
    port: 3000,
    host: "localhost",
  },
  entry: {
    main: path.resolve(__dirname, "./src/scripts/index.js"),
  },

  output: {
    path: path.resolve(__dirname, "./dist/scripts"),
    filename: "index.js",
    clean: true,
    assetModuleFilename: "../images/[hash][ext][query]",
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: "forkio",
      template: path.resolve(__dirname, "./src/index.html"), // template file
      filename: "../index.html", // output file
    }),
    new MiniCssExtractPlugin({
      filename: "../styles/style.css",
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],

  module: {
    rules: [
      // html
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      //   babel
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      //   styles
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          // Creates `style` nodes from JS strings
          //   to get css file in dist folder this is not needed? we have extractPlugin
          //   "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      //   images
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: "asset/inline",
      },
    ],
  },
};
