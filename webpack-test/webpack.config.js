var path = require("path")
var htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
     entry:{
         // bundle:['./src/script/main.js','./src/script/a.js']
         main:'./src/script/main.js',
         a:'./src/script/a.js',
         b:'./src/script/b.js',
         c:'./src/script/c.js'
     },
     output:{
         path:path.resolve(__dirname, './dist'),
         filename:'js/[name]-[chunkhash].js',
        //  publicPath:'http://cdn.com/'
         //filename:'[name]-[chunkhash].js'
     },
    plugins: [
        new htmlWebpackPlugin({
            filename:'a.html',
            template:'template.html',
            inject:'body',//插入的位置
            title:'a',
            // chunks: ['a'],
            excludeChunks:['b','c'],
            // date:new Date(),
            minify:{
                removeComments:true,
                //collapseWhitespace:true
            }
        }),
        new htmlWebpackPlugin({
            filename:'b.html',
            template:'template.html',
            inject:'body',//插入的位置
            title:'b',
            excludeChunks:['a','c'],
            // chunks: ['b'],
            // date:new Date(),
            minify:{
                removeComments:true,
                //collapseWhitespace:true
            }
        }),
        new htmlWebpackPlugin({
            filename:'c.html',
            template:'template.html',
            inject:'body',//插入的位置
            title:'c',
            excludeChunks:['a','b'],
            // chunks: ['c'],
            // date:new Date(),
            minify:{
                removeComments:true,
                //collapseWhitespace:true
            }
        })
    ]
};
