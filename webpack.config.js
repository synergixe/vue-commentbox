module.exports = {

	entry:{
		"comment-box":"./src/components/CommentBox.vue"
	},
	output:{
		filename:"./dist/[name].js"
	},
	module:{
		rules: [
			{
			    test: /\.vue$/,
			    exclude: /node_modules/,
			    loader: 'vue-loader'
			},
			{
			    test: /\.js$/,
			    exclude: /node_modules/,
			    use: {
			    loader: 'babel-loader'
			    }
			}
		]
	}
};

