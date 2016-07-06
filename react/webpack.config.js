var webpack = require("webpack");
var path = require('path');
module.exports = {
    entry: [
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:9999',
    path.resolve(__dirname, 'app/main.js'),
    ],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
    },
    plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    })
  ],
    module: {
    loaders:[
        { test: /\.jsx?$/,loader: 'babel'},
        { test: /\.css$/, loader: 'style-loader!css-loader' },
    ]
  }
};
