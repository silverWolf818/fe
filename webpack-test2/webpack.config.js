var path = require("path")
var htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
     entry:'./src/app.js',
     output:{
         path:path.resolve(__dirname, './dist'),
         filename:'js/[name].js',
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
