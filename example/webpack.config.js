var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');

module.exports = {
  context: __dirname,
  entry: "./index.js",
  output: {
    path: __dirname,
    filename: "./index-built.js"
  },
};
