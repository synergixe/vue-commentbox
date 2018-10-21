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
        <ul class="comment-list" ref="clist">
            <comment v-for="(comment, index) in comments" :key="`comment-${index}`"> :author="comment.author" :text="comment.text" :avatar-thumbnail="comment.avatar_thumbnail"></comment>
        </ul>
    </div>
</template>

<script>
    import * as Helpers from '../utils/helpers'

    import Comment from "./Comment.vue";
    
    export default {
        components: { Comment },
        mounted(){

            if(!Helpers.doesSupportEmoji()){
	            Helpers.replaceAllEmojiInAncestor(this.$ref.clist);
            }

        },
        props: {
            comments:Array
        }
    };
</script>

<style scoped>
.comment-list .comment-body-container .comment-body-input {
      border-color: transparent !important;
}
</style>
