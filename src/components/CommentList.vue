/*!
 * @copyright: Copyright (c) 2018 Oparand Ltd - Synergixe
 *
 * @author: https://twitter.com/isocroft
 * @version:
 * @desc:
 * @created: 
 */
 
<template>
  <div class="comment-list-row">
    <ul
      ref="clist"
      class="comment-list"
    >
      <comment
        v-for="(comment, index) in comments"
        :key="`comment-${index}`"
        :author="comment.author"
        :text="comment.text"
        :posted="comment.posted"
        :avatar-thumbnail="comment.avatar_thumbnail"
      />
    </ul>
  </div>
</template>

<script>
    import Helpers from "../utils/helpers.js"

    import Comment from "./Comment.vue";
    
    export default {
        components: { Comment },
        props: {
            comments:Array
        },
        mounted(){

            if(!Helpers.doesSupportEmoji()){
	            Helpers.replaceAllEmojiInAncestor(this.$ref.clist);
            }

        }
    };
</script>

<style scoped>
.comment-list .comment-body-container .comment-body-input {
      border-color: transparent !important;
}
</style>
