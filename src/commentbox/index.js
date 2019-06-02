/*!
 * @copyright: Copyright (c) 2018 Oparand Ltd - Synergixe
 *
 * @author: https://twitter.com/isocroft
 * @version:
 * @desc:
 * @created: 
 */


import CommentBox from '../components/CommentBox.vue'

const CommentBoxPlugin = {
  install: function(Vue, options = {}) {
      if (this.install.installed) return;
      
      Vue.component(CommentBox.name, CommentBox)
  }
};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  CommentBoxPlugin.install(window.Vue)
}


export { CommentBox, CommentBoxPlugin }
