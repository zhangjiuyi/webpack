/**
 * Created by zhangjiuyi on 2017/7/12.
 */




var path = require('path');
var webpack = require("webpack");

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpackNotifierPlugin = require('webpack-notifier'); //编译成功提示
var htmlWebpackPlugin = require('html-webpack-plugin')  //html模板注入


module.exports = {
	
	entry: './src/main.js',  //入口文件
	
	output: {
		// 导出目录,最好为绝对路径
		path: path.resolve(__dirname, '../dist'),
		
		// publicPath: 'http://cdn:',  //打包后cdn地址
		//包规范格式
		libraryTarget: 'umd',
		library: 'library',
		//哈希长度
		hashDigestLength: 2,
		//导出文件
		filename: 'js/_[name].[hash].js'
	},
	
	devtool: 'source-map',
	
	plugins: [
		
		//成功提示插件
		new webpackNotifierPlugin({
			title: '编译成功',
			alwaysNotify: true
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),
		
		new ExtractTextPlugin({
			filename: '[name][hash].css',
			disable: false,
			allChunks: true
		}),
		
		new htmlWebpackPlugin({
			filename: './index.html',
			template: 'index.html',
			inject: true,
			minify: {
				removeComments: true, //删除注释
				collapseWhitespace: false    //删除空格 压缩
			}
		}),
	],
	
	module: {
		rules: [
			{
				test: /\.js?$/,
				exclude: path.resolve(__dirname, 'node_modules'),  //node_modules 排除目录
				include:  path.resolve(__dirname, 'src'),    //只查找src目录
				use:[{
					loader: 'babel-loader',
					options: {
						"presets": [
							"es2015",
							"stage-0"
						]
					}
				}]
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: {
						loader:'css-loader',
						options: {
							minimize: true
						}
						
					}
				})
			},
			{
				test: /\.less$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader',{
						loader: 'less-loader',
					}]
				})
			},
			{
				test: /\.(png|jpg|jpeg|gif|woff|woff2|ttf|eot|svg|swf)$/,
				use: {
					loader:'file-loader',
					options:{
						name:'img/[name]_[sha512:hash:base64:7].[ext]'
					}
				}
			},
			{
				test: /\.html/,
				loader: 'html-withimg-loader'
			}
		]
	}
}
