/*!
 * @copyright: Copyright (c) 2018 Oparand Ltd - Synergixe
 *
 * @author: https://twitter.com/isocroft
 * @version: 0.0.2
 * @desc:
 * @created: 04/03/2019
 */
 
<template>
  <main class="board">
    <post 
      :likes="23"
      :author="'https://via.placeholder.com/50'"
      :author-name="'Dauda Adeboye'"
      :text="'Hi... What\'s happening guys ?'"
    />
    <comment-box
      :comments="comments"
      :input-placeholder-text="placeHolderText"
      :context-author="'Dauda Adeboye'"
      :context-avatar-thumb="thumbImage"
      :box-action="actionHref"
      :use-xhr="xhr"
      @beforesend="beforeSend"
    />
  </main>
</template>

<script>
import PostBox from './PostBox.vue'
import { CommentBox } from '../src/index.js'

export default {
    components: {
        'post':PostBox,
        'comment-box':CommentBox
    },
    data: () => ({
      comments:[],
      placeHolderText:'Post Something',
      xhr:true
    }),
    computed:{
      actionHref:function(){
      
        let origin = window.location.origin;
      
        return `${origin}/store/comment`;
      },
      thumbImage:function(){
      
        let scheme = window.location.protocol;
        
        return `${scheme}//assets-cdn.store.com.ng/images/png/passport.jpg`
      
      },
      usernamesAvailable:function(){
      
        return true;
      }
    },
    methods:{
      beforeSend:function(){
        console.log("about to send comment to server...")
      }
    }
}
</script>

<style lang="css" scoped>
  main.board {
    width: auto !important;
    display: block;
    border:3px solid #545454;
    margin:0;
    padding:20px;
  }
</style>
