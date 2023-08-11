const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const path = require("path");

module.exports = {
  mode: "development",
  devServer: {
    open: true,
    hot: true,
    port: 3000,
    host: "localhost",
  },
  entry: {
    main: path.resolve(__dirname, "./src/scripts/index.js"),
  },

  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "index.js",
    clean: true,
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: "webpack",
      template: path.resolve(__dirname, "./src/index.html"), // template file
      filename: "index.html", // output file
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
          // Creates `style` nodes from JS strings
          "style-loader",
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
