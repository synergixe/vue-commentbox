module.exports = {

	entry:{
		"comment-box":"./src/components/CommentBox.vue"
	},
	output:{
		filename:"./dist/[name].js"
	},
	module:{
		loaders:[
			{test: /\.vue$/, loader:"vue"},
			{test: /\.js$/, loader:"babel"}
		]
	}
};


const { VueLoaderPlugin } = require('vue-loader');
const path = require('path');
const env = process.env.NODE_ENV;

const config = {
  entry: path.join(__dirname, 'src', 'main.js'),
  mode: env,
  output: {
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [path.join(__dirname, 'src')],
      }
    ],
  },
  plugins: [
    new VueLoaderPlugin()
  ],
};

module.exports = config;
