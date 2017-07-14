/**
 * Created by zhangjiuyi on 2017/7/12.
 */


const path = require('path')
const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')

const ExtractTextPlugin = require('extract-text-webpack-plugin')


module.exports = {
	entry: ['webpack-hot-middleware/client?reload=true&noInfo=true' , './src/main.js'],
	
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: "[name].[hash].js",
		publicPath: '/'
	},
	
	devtool: 'source-map',
	
	//放置插件
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		
		new ExtractTextPlugin({
			filename: './css/[name][hash].css',
			disable: false,
			allChunks: true
		}),
		
		new htmlWebpackPlugin({
			filename: 'index.html',
			template: 'index.html',
			inject: true
		})
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
					use:{
						loader:'css-loader',
						options: {
							sourceMap: true
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
						options: {
							sourceMap: false
						}
					}]
				})
			},
			{
				test: /\.(png|jpg|jpeg|gif|woff|woff2|ttf|eot|svg|swf)$/,
				use: {
					loader:'file-loader',
					options:{
						name:'[name]_[sha512:hash:base64:7].[ext]'
					}
				}
			},
			{
				test: /\.html/,
				loader: 'html-withimg-loader'   //处理html img标签 无法转换路径
			}
		]
	}
}