var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');

module.exports = {
  context: __dirname,
  entry: "./client.js",
  output: {
    path: __dirname,
    filename: "./public/client-built.js"
  },
};
