const path = require("path");
// html-plugin
const HtmlWebpackPlugin = require("html-webpack-plugin");
// workbox-plugin
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");
// css-plugin
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isProduction = process.env.NODE_ENV == "production";

const stylesHandler = "style-loader";

// for development
const mode = process.env.NODE_ENV || "dvelopment";
const devMode = mode === "development";
// const target = devMode ? "web" : "browserslist";
// const devtool = devMode ? "source-map" : undefined;

const config = {
  mode,
  //   target,
  //   devtool,
  entry: {
    index: path.resolve(__dirname, "src", "index.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    clean: true,
    filename: "index.js",
  },
  //   for debugging source-map
  //   devtool: "source-map";
  devServer: {
    // static: {
    //   directory: path.resolve(__dirname, "dist"),
    // },
    host: 3000,
    open: true,
    hot: true,
    // compress: true,
    host: "localhost",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "index.html"),
      title: "Forkio",
      filename: "[name].html",
    }),
    new MiniCssExtractPlugin({
      filename: "styles.css",
    }),

    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: "html-loader",
        // use: [
        //     loader: "html-loader",
        //   {
        //     loader: "html-minifier-loader",
        //     options: {
        //       removeComments: true,
        //       collapseWhitespace: true,
        //     },
        //   },
        // ],
      },
      {
        test: /\.(js|jsx)$/i,
        loader: "babel-loader",
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, "style-loader", "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin,
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";

    config.plugins.push(new WorkboxWebpackPlugin.GenerateSW());
  } else {
    config.mode = "development";
  }
  return config;
};
