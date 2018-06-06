<template>
    <div class="comment-list-row">
        <ul class="comment-list">
            <comment v-for="(comment, index) in comments" :key="`comment-${index}`"> :author="comment.author" :text="comment.text" :avatar-thumbnail="comment.avatar_thumbnail"></comment>
        </ul>
    </div>
</template>

<script>
    import Comment from "./Comment.vue";
    
    export default {
        components: { Comment },
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
