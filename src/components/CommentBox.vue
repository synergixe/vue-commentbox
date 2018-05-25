<template>
  <div class="comment-box" v-cloak>
    <h1 v-once=""></h1>
    <p v-once=""></p>
    <comment-list :comments="comments"></comment-list>
    <comment-form></comment-form>
  </div>
</template>

<script>
    import CommentList from "./CommentList.vue";
    import CommentForm from "./CommentForm.vue";
    export default {
        components: { CommentList, CommentForm },
        data () {
            return {
                comments: [
                    {avatar_thumbnail:"", author: "Mike", text: "This is a comment"},
                    {avatar_thumbnail:"", author: "Joe", text: "This is another comment"},
                ]
            }
        },
        events: {
            // Add new comment
            "new-comment": function(comment) {
                this.comments.push(comment);
            }
        }
    }
</script>

<style>
    
</style>
