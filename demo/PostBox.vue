/*!
 * @copyright: Copyright (c) 2018 Oparand Ltd - Synergixe
 *
 * @author: https://twitter.com/isocroft
 * @version:
 * @desc:
 * @created: 
 */

<template>
  <article class="postbox">
    <div class="top-content float-layout">
        <div class="left-fixed">
            <img :src="author" :alt="authorName" class="picture" width="40" height="40">
        </div>
        <div class="right-fluid">
            <span v-text="text" class="post">
            </span>
        </div>
    </div>
    <div class="bottom-content float-layout">
        <div class="right-fixed">
            <a href="#" class="button-icon like" :title="likes"></a>
            <!--<a href="#" class="button-icon menu"></a>-->
            <a href="#" class="button-icon fave"></a>
        </div>
    </div>
  </article>
</template>

<script>
  export default {
    props: {
        text: {
            type: String,
            required:true
        },
        author: {
            type: String,
            required:true
        },
        likes: {
            type: Number,
            required:true
        },
        authorName: {
            type: String,
            required: true
        }
    },
    data() {
        return {

        }
    },
    methods:{
        likeClick() {

        },
        faveClick() {

        },
        menuClick() {

        }
    }
  }
</script>

<style lang="css" scoped>
    * {
        margin: 0;
        padding: 0;
        border: none;
    }

    a.button-icon {
        display: inline-block;
        padding:2px 5px;
        position: relative;
        color: transparent;
        border: 1px solid #1f1f1f;
        user-select: none;
        -moz-user-select: -moz-none;
        -webkit-user-select:none;
        text-decoration: none;
        cursor: pointer;
        border-radius:50%;
        -moz-border-radius:50%;
        -webkit-border-radius:50%;
    }

    a.button-icon + a.button-icon {
       margin-left: 8px;
    }

    a.fave:before {
        content: "\2605";
        display: inline-block;
        position: relative;
        color: #343434;
        bottom: auto;
        right: auto;
        top: 50%;
        text-align: center;
    }

    a.like:after {
        content: "+" attr(title);
        display: inline-block;
        color: red;
        position: absolute;
        padding: 2px;
        font-size:small;
            top: -73%;
    right: auto;
    left: 50%;
    }

    a.like:before {
        content: "\2764"; /* heart */
        display: inline-block;
        position: relative;
        color: #343434;
        bottom: auto;
        right: auto;
        top: 50%;
        text-align: center;
    }

    a.menu:before {
        content: "\2026"; /* ellipsis */
        display: inline-block;
        position: relative;
        color: #343434;
        bottom: auto;
        right: auto;
        top: 50%;
        text-align: center;
    }

    .post {
        display: inline-block;
        width: 100%;
    }

    .picture {
        display:block;
        width:100%;
        max-width:100%;
        height:auto !important;
    }

    .float-layout:after { 
        clear:both; 
        visibility:hidden; 
        display:block; 
        height:0; 
        content: " "; /* Older browser(s) do not support empty content */
    }

    .left-fixed {
        float:left !important;
        vertical-align:bottom;
        width:40px;
    }

    .right-fixed {
        float:right !important;
        vertical-align:middle;
        width:auto !important;
        padding:2px 5px;
    }

    .right-fluid {
        margin-left:40px;
        padding-left:11px;
    }

    article.postbox {
        background-color: #f1f1f1;
        display: block;
        width:auto !important;
        padding:5px 15px;
        position: relative !important;
    }

    div.top-content, div.bottom-content {
        *height: auto !important;
        min-height:1px;
        width: auto !important;
        padding:15px 0px;
    }

    div.top-content {
        border-bottom:1px solid #e3e3e3;
    }
</style>