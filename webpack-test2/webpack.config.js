var path = require("path")
var htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
     entry:'./src/app.js',
     output:{
         path:path.resolve(__dirname, './dist'),
         filename:'js/[name].js',
     },
    module: {
        loaders: [
            {
                test:/\.js$/,
                loader: 'babel-loader?cacheDirectory',
                exclude: /(node_modules|bower_components)/,
                include:'/src/',
                options: {
                    presets:['env'],
                    plugins: ['transform-runtime']
                }
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            filename:'index.html',
            template:'index.html',
            title:'webpack',
            inject:'body'
        }),
    ]
};
