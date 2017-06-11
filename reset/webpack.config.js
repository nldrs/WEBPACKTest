var htmlWebpackPlugin = require('html-webpack-plugin');//插件引用
var path = require('path');
var webpack = require('webpack');
module.exports = {
    context : __dirname,//路劲
    entry: './src/app.js',//入口
    output: { //打包后
        path: './dist',//存放位置
        filename: 'js/[name].bundle.js' //存放名
    },
    module:{
        loaders:[
            {
                test: /\.js$/,
                loader:'babel-loader',
                exclude: path.resolve(__dirname,'node_modules') ,//不处理 path.resolveh回复决定路径
                include: path.resolve(__dirname,'src'), //打包src下的文件
                query: {
                    presets: ['latest']
                }
            },
            {
                test: /\.css$/,
                loader:'style-loader!css-loader?importLoaders=1!postcss-loader'
            },
            {
                test: /\.less$/,
                loader:'style-loader!css-loader!postcss-loader!less-loader'
            },
            {
                test: /\.scss$/,
                loader:'style-loader!css-loader!postcss-loader!sass-loader'
            },
            //{
            //    test: /\.(png|jpg|gif|svg)$/i,
            //    loader:'file-loader',
            //    query:{
            //        name : 'assets/[name]-[hash:5].[ext]'
            //    }
            //},
            //{ //打包成base64
            //    test: /\.(png|jpg|gif|svg)$/i,
            //    loader:'url-loader',
            //    query:{
            //        limit: 2000,
            //        name : 'assets/[name]-[hash:5].[ext]'
            //    }
            //},
            {
                test: /\.(png|jpg|gif|svg)$/i,
                loaders:[
                    'url-loader?limit=1000&name=assets/[name]-[hash:5].[ext]',
                    'image-webpack-loader' //压缩
                ]
            }
        ]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            options:{
                postcss:[
                    require('autoprefixer')({
                        broswers: ['last 5 versions']
                    })
                ]
            }
        }),
        new htmlWebpackPlugin({
            filename : 'index.html',
            template: 'index.html',//指定模板文件
            inject: 'body'//inject脚本插入方式 ,这里指js插入在head之间
        })
    ]


}
