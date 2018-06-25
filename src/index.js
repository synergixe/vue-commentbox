import CommentBox from './CommentBox.vue'

const CommentBoxPlugin = {
  CommentBox,
  install: function(Vue, options) {
      Vue.component(CommentBox.name, CommentBox)
  }
}

export default CommentBoxPlugin
export { CommentBox }
