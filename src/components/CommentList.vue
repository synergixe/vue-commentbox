/*!
 * @copyright: Copyright (c) 2018 Oparand Ltd - Synergixe
 *
 * @author: https://twitter.com/isocroft
 * @version: 0.0.2
 * @desc:
 * @created: 13/05/2018
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
        components: { 'comment':Comment },
        props: {
            comments:Array
        },
        mounted(){

            if(!Helpers.doesSupportEmoji()){
	            Helpers.replaceAllEmojiInAncestor(this.$refs.clist);
            }

        }
    };
</script>

<style lang="css" scoped>
.comment-list .comment-body-container .comment-body-input {
      border-color: transparent !important;
}
</style>
