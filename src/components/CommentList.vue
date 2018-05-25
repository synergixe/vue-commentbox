<template>
    <ul class="comment-box_list">
        <comment v-for="comment in comments" :author="comment.author" :text="comment.text" :avatar-thumbnail="comment.avatar_thumbnail"></comment>
    </ul>
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

<style>
   
</style>
