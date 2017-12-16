const path = require('path');
const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin')

// webpack --config webpack.dev.dll.config.js

const vendors = [
    'jquery'
];

module.exports = {
    entry: {
        vendor_dev: vendors,
    },
    output: {
        path: path.resolve(__dirname, './src/js'),
        filename: '[name].dll.js',
        library: '[name]_library',
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
        }),
        new webpack.DllPlugin({
            context: __dirname,
            name: '[name]_library',
            path: path.join(__dirname, '[name]-manifest.json'),
        }),
        new AssetsPlugin(),
        // new webpack.optimize.UglifyJsPlugin({
        //     comments: false,
        //     warnings: false,
        // }),
    ],
};
