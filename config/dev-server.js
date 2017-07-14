/**
 * Created by zhangjiuyi on 2017/7/12.
 */


const express = require('express')
// const path = require('path')
const webpack = require('webpack')

let webpackConfig = require('./dev-config')

let app = express()

const compiler = webpack(webpackConfig);

app.use(require("webpack-dev-middleware")(compiler, {
	noInfo: true,
	// publicPath: webpackConfig.output.publicPath
}));

app.use(require("webpack-hot-middleware")(compiler));


const opn = require('opn')

opn('http://localhost:9911')

app.listen(9911)