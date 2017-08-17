var path = require("path")
var htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
     entry:{
         // bundle:['./src/script/main.js','./src/script/a.js']
         main:'./src/script/main.js',
         a:'./src/script/a.js'
     },
     output:{
         path:path.resolve(__dirname, './dist'),
         filename:'js/[name]-[hash].js'
         //filename:'[name]-[chunkhash].js'
     },
    plugins: [
        new htmlWebpackPlugin({
            filename:'index-[hash].html',
            template:'index.html',
            inject:'body',//插入的位置
            title:'webpack good'
        })
    ]
};
