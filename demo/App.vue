/*!
 * @copyright: Copyright (c) 2018 Oparand Ltd - Synergixe
 *
 * @author: https://twitter.com/isocroft
 * @version:
 * @desc:
 * @created: 
 */
 
<template>
  <main class="">
    <comment-box
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
import CommentBox from '@/src/index.js'

export default {
    components: {
        CommentBox
    },
    data: () => ({
      placeHolderText:'Post Something',
      xhr:true
    }),
    method:{
      beforeSend:function(){
	     
      }
    },
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
    }
}
</script>

<style scoped>

</style>
