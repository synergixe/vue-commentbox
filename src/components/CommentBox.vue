<template>
  <div class="comment-box" v-cloak>
    <h1 v-once=""></h1>
    <p v-once=""></p>
    <comment-list :comments="comments"></comment-list>
    <comment-form :author="author" :avartar-thumbnail="avatar-url-thumb"></comment-form>
  </div>
</template>

<script>
    import CommentList from "./CommentList.vue";
    import CommentForm from "./CommentForm.vue";
    export default {
        components: { CommentList, CommentForm },
        props:{
          author:String,
          avatarUrlThumb:String
        },
        data () {
            return {
                comments: [
                    {avatar_url_thumb:"", author: "Mike", text: "This is a comment"},
                    {avatar_url_thumb:"", author: "Joe", text: "This is another comment"},
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
