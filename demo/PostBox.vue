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
            <img :src="author" alt="">
        </div>
        <div class="right-fluid">
            <span v-text="text" class="">
            </span>
        </div>
    </div>
    <div class="bottom-content float-layout">
        <div class="right-fixed">
            <a href="#" class="button-icon like" :title="likes"></a>
            <!--<a href="#" class="button-icon fave"></a>-->
            <a href="#" class="button-icon menu"></a>
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
        display:inline-block;
        padding:15px;
        position:relative;
    }

    a.like:before {
        content: "\2605"; /* star */
        display:inline-block;
        position:relative;
        top:0;
    }

    a.like:after {
        content: "+"attr(title)
    }

    a.fave:before {
        content: "\2764"; /* heart */
        display:inline-block;
        position:relative;
        top:0;
    }

    a.menu:before {
        content: "\2026"; /* ellipsis */
        display:inline-block;
        position:relative;
        top:0;
    }

    .text-v-center{
        text-align: center !important;
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
    }

    article.postbox {
        background-color: #f2f2f2;
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
        border-bottom:1px solid #eeeeee;
    }
</style>