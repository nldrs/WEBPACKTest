const htmlWebpackPlugin = require('html-webpack-plugin'),
  Webpack = require('webpack');

module.exports = {
  //输入文件路径，
  entry: {
    app: './src/app.js',
    // main: ['main1.js', 'main2.js']    // 能够写出数组的形式， 并且这里意思为将两个文件打包生成一个文件
  },

  //输出配置
  output: {
    path: __dirname + '/dist',
    filename: 'js/[name].bundle.js'
      // publicPath: 'http://zachrey'   //修改所有的引入文件的路径，例如src=“photo.png”  ==>  src="http://zachrey/photo.png"   
  },

  //插件定义
  plugins: [
    //自动生成html页面
    new htmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: 'body',
      title: 'webpack-loader'
    }),
    //webpack里面的loader添加插件
    new Webpack.LoaderOptionsPlugin({
      options: {
        //添加postcss-loader的插件
        postcss: function() {
          return [
            require('autoprefixer')({
              broswers: ['last 5 versions']
            })
          ];
        }
      }
    })
  ],

  //定义loader规则
  module: {
    rules: [{
      //js文件，  babel转换
      test: /\.js$/,
      exclude: /node_modules/,
      include: /src/,
      loader: "babel-loader",
      //options 代替版本1.* 的query
      options: {
        presets: ["latest"]
      }
    }, {
      //css文件导入
      test: /\.css$/,
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader',
        //设置cssloader后面加入的loader数
        options: {
          importLoaders: 1
        }
      }, {
        loader: 'postcss-loader'
      }]
    }, {
      //less文件 ， sass（scss）文件类似
      //loader的顺序是从下往上，也就是less先执行，最后执行style
      test: /\.less$/,
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader'
      }, {
        loader: 'postcss-loader'
      }, {
        loader: 'less-loader'
      }]
    }, {
      //html文件
      test: /\.html$/,
      use: [{
        loader: 'html-loader'
      }]
    }, {
      //图片文件
      test: /\.(png|jpg|svg)$/i,
      use: [{
        // loader: 'file-loader',
        loader: 'url-loader',
        options: {
          //
          limit: 20000,
          name: 'assets/[name]-[hash:5].[ext]'
        }
      }, {
        //压缩图片文件
        loader: 'image-webpack-loader'
      }]
    }]
  }
}