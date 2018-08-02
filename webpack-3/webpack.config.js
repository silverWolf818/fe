// const path = require('path')
//
// module.exports = {
//     entry:{
//
//     },
//     output:{
//         path: path.resolve(__dirname,'dist'),
//         filename:'bundle.js'
//     }
// }

const webpack = require('webpack');
const path = require('path')

module.exports = {
    entry:{
        pageA: path.resolve(__dirname, './a.js'),
        pageB: path.resolve(__dirname, './b.js'),
    },
    output:{
        path: path.resolve(__dirname,'dist'),
        filename: '[name].[chunkhash:8].js',
    },
    plugins:[
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: 2,
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            chunks: ['vendor']

        })
    ]
}





