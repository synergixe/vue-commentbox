var path = require('path');
var webpack = require('webpack');

module.exports = {
	mode: process.env.NODE_ENV,
	entry:path.resolve(__dirname, '/src/index.js'),
	output:{
		path: path.resolve(__dirname, './dist'),
		library: 'vue-commentbox',
	    	libraryTarget: 'umd',
	    	filename:"vueCommentBox.js",
	    	umdNamedDefine: true
	},
	module:{
		rules: [
			{
			    test: /\.vue$/,
			    exclude: /node_modules/,
			    loader: 'vue-loader',
			    options: {
				loaders: {
					
    				}
			    }
			},
			{
			    test: /\.js$/,
			    exclude: /node_modules/,
			    loader: 'babel-loader'
			},
			{
			  test: /\.(png|jpg|gif|svg)$/,
			  loader: 'file-loader',
			  options: {
			    name: '[name].[ext]?[hash]'
			  }
			}
		]
	},
	devServer: {
	  	historyApiFallback: true,
	  	noInfo: true,
		overlay:true
	},
	performance: {
	  	hints: false
	},
	devtool: '#eval-source-map'
};

// Make sure to set the NODE_ENV environment variable to 'production'
// when building for production!
if (process.env.NODE_ENV === 'production') {
  // Use standard source mapping instead of eval-source-map.
  module.exports.devtool = '#source-map'

  // http://vue-loader.vuejs.org/en/workflow/production.html
  // Add these plugins:
  module.exports.plugins = (module.exports.plugins || []).concat([
	new webpack.DefinePlugin({
	      'process.env': {
		NODE_ENV: '"production"'
	      }
	}),
    // Crumples your bundled source code into a tiny little ball.
    // (Minifies it.)
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),

    // This is just here for compatibility for legacy webpack plugins
    // with an options format that isn't compatible with Webpack 2.x
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
