var path = require("path");
var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var glob = require('glob');
var assets = require("./webpack-assets.json");
// var ExtractTextPlugin = require("extract-text-webpack-plugin")
// var extractLESS = new ExtractTextPlugin('[name].css');
//入口文件定义
var entries = getEntry('src/view/**/*.js','src/view/')
var vendor = getEntry('src/js/*.js','src/js/')
function getEntry(globPath,pathDir) {
    var files = glob.sync(globPath);
    var entries = {}, entry, dirname, basename, pathname, extname;
    for (var i = 0; i < files.length; i++) {
        entry = files[i];
        dirname = path.dirname(entry);
        extname = path.extname(entry);
        basename = path.basename(entry, extname);
        pathname = path.join(dirname, basename);
        pathname = pathDir ? pathname.replace(new RegExp('^' + pathDir), '') : pathname;
        entries[pathname] = ['./' + entry];
    }
    return entries;
}
var obj = Object.assign(entries, vendor);
console.log(obj);
var config = {
    entry:obj,
    output:{
        path:path.resolve(__dirname, './dist'),
        filename:'js/[name].js',
        chunkFilename: 'scripts/[id].chunk.js?[chunkhash]'
    },
    resolve: {
        extensions: ['.js']
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
            // {
            //     test: /\.html$/,
            //     include: path.resolve(__dirname, './src'),
            //     use: {
            //         loader: 'html-loader',
            //     }
            // },
            {
                test: /\.tpl/,
                include: path.resolve(__dirname, './src'),
                loader:'ejs-loader'
            },
            // {
            //     test: /\.(less)$/,
            //     use: extractLESS.extract([ 'css-loader','less-loader' ])
            // },
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
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
                loader: 'file-loader',
                query: {
                    name: 'assets/[name]-[hash].[ext] '
                }
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("css/[name].css"),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        // extractLESS
    ]
};

var pages = Object.keys(getEntry('src/view/**/*.html', 'src/view/'));
// console.log(getEntry('src/view/**/*.html', 'src/view/'));
pages.forEach(function(pathname) {
    var conf = {
        filename: 'view/' + pathname + '.html', //生成的html存放路径，相对于path
        template: 'src/view/' + pathname + '.html', //html模板路径
        inject: true,    //js插入的位置，true/'head'/'body'/false
        chunks:[pathname],
        assets: assets
        /*
        * 压缩这块，调用了html-minify，会导致压缩时候的很多html语法检查问题，
        * 如在html标签属性上使用{{...}}表达式，所以很多情况下并不需要在此配置压缩项，
        * 另外，UglifyJsPlugin会在压缩代码的时候连同html一起压缩。
        * 为避免压缩html，需要在html-loader上配置'html?-minimize'，见loaders中html-loader的配置。
         */
        // minify: { //压缩HTML文件
        //     removeComments: true, //移除HTML中的注释
        //     collapseWhitespace: false //删除空白符与换行符
        // }inject = 'body';

    };
    // if (pathname in config.entry) {
    //     conf.inject = 'body';
    //     conf.chunks = ['vendors', pathname];
    //     conf.hash = true;
    // }
    config.plugins.push(new htmlWebpackPlugin(conf));
});


module.exports = config;
