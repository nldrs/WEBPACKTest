var Webpack=require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var extractCSS = new ExtractTextPlugin('css/index.css');
module.exports={
    entry:{
        app:__dirname+"/src/js/index.js",//唯一的入口文件
        vendor:['jquery'],
        more:[__dirname+"/src/js/1.js",__dirname+"/src/js/2.js"]
    },
    output:{
        path:__dirname+"/assset/",
        filename:"js/[name].js",
        publicPath:"192.168.0.102/assset"
    },
    devServer:{
        contentBase:'./',
        host:'192.168.0.102',
        port:"7777"
    },
    module: {
        loaders: [
            /* {
             test:/\.css$/,
             loader:"style-loader!css-loader"
             },
             {
             test:/\.less$/,
             loader:"style!css!less"
             },*/
            {
                test: /\.json/,
                loader: "json-loader"
            },
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                options: {
                    presets: ["es2015", 'react']
                }
            }
        ],
        /* rules: [{
         test: /\.css$/,
         exclude: '/node_modules/',
         use: ExtractTextPlugin.extract({
         fallback: [{
         loader: 'style-loader'
         }],
         use: [{
         loader: 'css-loader'
         }]
         })
         }]*/
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.(png|jpg)$/,
                use: "file-loader?limit=5000&name=/images/[hash:5].[ext]"
                // use: "file-loader?limit=5000&name=[hash:5].[ext]&publicPath=192.168.0.102&outputPath=/images/"
            },
            {
                test: /\.html$/,
                use: [ {
                    loader: 'html-loader',
                    options: {
                        minimize: true
                    }
                }]
            }
        ]
    },
    plugins:[
        new Webpack.HotModuleReplacementPlugin(),
        extractCSS,
        new HtmlWebpackPlugin({
            title:"小李",
            filename:"../home-tpl.html",
            template:__dirname+"/src/tpl/tpl.html",
            inject:"body",
            info:"come on body"
        }),
        new Webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new Webpack.ProvidePlugin({
             $:"jquery"
        }),
        new Webpack.optimize.CommonsChunkPlugin({
            name:["a","b"],
            // name: 'vendor',
            // filename: 'vendor/jquery.js',
            minChunks: 2
        })
    ]
   // watch:true
};