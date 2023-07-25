const path = require("path");
// html-plugin
const HtmlWebpackPlugin = require("html-webpack-plugin");
// workbox-plugin
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");
// css-plugin
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isProduction = process.env.NODE_ENV == "production";

// const stylesHandler = "style-loader";

// for development
const mode = process.env.NODE_ENV || "dvelopment";
const devMode = mode === "development";
const target = devMode ? "web" : "browserslist";
const devtool = devMode ? "source-map" : undefined;

const config = {
  mode,
  target,
  devtool,
  devServer: {
    port: 3000,
    open: true,
    hot: true,
    // compress: true,
    host: "localhost",
  },
  entry: {
    index: path.resolve(__dirname, "src", "index.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    clean: true,
    filename: "[name].js",
    assetModuleFilename: "images/[name][ext]",
  },
  //   for debugging source-map
  //   devtool: "source-map";
  plugins: [
    new HtmlWebpackPlugin({
      title: "Forkio",
      filename: "[name].html",
      template: path.resolve(__dirname, "src", "index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: "styles/styles.css",
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
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.css$/i,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
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
