<template>
    <form class="comment-form" v-on:submit.prevent="onSubmit">
        
    </form>
</template>

<script>
    export default {
        data() {
            return {
                text: ""
            }
        },
        methods: {
            // Handle form submit
            onSubmit() {
                if (this.text !== "") {
                    // Dispatch event to parent components
                    this.$dispatch("new-comment", {
                        author: this.author,
                        text: this.text
                    });
                    // Reset Form
                    this.text = "";
                }
            }
        }
    };
</script>

<style>
    
</style>
