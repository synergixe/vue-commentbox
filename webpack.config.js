var path = require('path');
var webpack = require('webpack');

const { VueLoaderPlugin } = require('vue-loader');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const _env = process.env.NODE_ENV
const isProd = _env === 'production'
const isTest = _env === 'test'

module.exports = {
	mode: _env,
	entry:{
		vuecommentbox : path.resolve(__dirname, '/src/index.js'),
		app: path.resolve(__dirname, '/demo/index.js')
	},
	output:{
			path: path.resolve(__dirname, './dist'),
			publicPath: '/dist/',
			library: 'vue-commentbox',
			libraryTarget: 'umd',
			filename:"[name].js",
			umdNamedDefine: true
	},
	module:{
		rules: [
			{
			    test: /\.vue$/,
			    exclude: /node_modules/,
			    loader: 'vue-loader',
			    options: {
						
			    }
			},
			{
			    test: /\.js$/,
			    exclude: /node_modules/,
			    loader: 'babel-loader'
			},
			{
					test: /\.(png|jpg|gif|svg)$/i,
					use: [ {
						loader: 'url-loader',
						options: {
							limit:4048,
							name: '[name].[ext]?[hash]'
						}
					}]
			}
		]
	},
	devServer: {
		compress: true,
		historyApiFallback: true,
		hot: true,
		open: true,
		noInfo: true,
		overlay:true,
		port: 8000,
		stats: {
			normal: true
		}
	},
	plugins:[
		new VueLoaderPlugin(),
		new HTMLWebpackPlugin({
			filename: path.join(__dirname, 'dist', 'index.html'),
      template: path.join(__dirname, 'demo', 'index.html'),
      inject: true,
      minify: isProd ? {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        // More options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      } : false,
		})
	],
	optimization: {
		splitChunks: {
      // Must be specified for HtmlWebpackPlugin to work correctly.
      // See: https://github.com/jantimon/html-webpack-plugin/issues/882
      chunks: 'all',
    }
	},
	performance: {
	  	hints: false
	},
	devtool: 'cheap-module-eval-source-map'
};

// Make sure to set the NODE_ENV environment variable to 'production'
// when building for production!
if (isProd) {
  // Use standard source mapping instead of eval-source-map.
  module.exports.devtool = undefined

	module.exports.optimization.minimizer = [
		// Crumples your bundled source code into a tiny little ball.
    // (Minifies it.)
    new UglifyJsPlugin({
			cache: true,
			parallel: true,
			sourceMap: !isProd
	 })
	]
  // http://vue-loader.vuejs.org/en/workflow/production.html
  // Add these plugins:
  module.exports.plugins = (module.exports.plugins || []).concat([
		new FriendlyErrorsPlugin()
  ])
}else if(isTest){
	module.exports.externals = [require('webpack-node-externals')()]
  module.exports.devtool = 'inline-cheap-module-source-map'
}
