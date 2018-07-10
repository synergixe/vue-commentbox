import CommentBox from './CommentBox.vue'

const CommentBoxPlugin = {
  install: function(Vue, options) {
      Vue.component(CommentBox.name, CommentBox)
  }
}

export { CommentBox, CommentBoxPlugin }
