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
            },
            {
              test: /\.(less|scss|css)$/,
              use: [
                  {
                      loader: 'style-loader',
                  },
                    {
                      loader: 'css-loader',
                      options: {
                        importLoaders: 1 // 0 => 无 loader(默认); 1 => postcss-loader; 2 => postcss-loader, sass-loader
                      }
                    },
                    {
                        loader:'postcss-loader',
                        options:{
                            plugins: (loader) => [
                                 require('postcss-import')(),
                                 require('autoprefixer')()
                               ]
                        }
                    },
                    {
                        loader:'less-loader'
                    },
                    {
                      loader:'sass-loader'
                    }
              ]
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
