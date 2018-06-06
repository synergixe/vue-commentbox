module.exports = {

	entry:{
		"comment-box":"./src/components/CommentBox.vue"
	},
	output:{
		filename:"./dist/[name].js"
	},
	module:{
		loaders:[
			{test: /\.vue$/, loader:"vue"}
		]
	}
}
