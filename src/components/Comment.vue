<template>
  <li class="comment-list-item clearfix variable-width-box" v-bind:class="{ comment-intermediate: !posted }">
     <div class="comment-box-post relative clearfix pull-left">
          
          <div class="pull-left left-float">
                <div class="img link-box margin-r5 comment-image-box">
                    <img v-bind:alt="author" class="img thumb-box-small" :src="avatarThumbnail">
                </div>
          </div>

          <div class="no-pull">
                <div class="comment-body-box variable-width-box">
                    <div class="relative text-left variable-width-box normalize-height">
                        <span class="line-block-box relative comment-text-block">{{ text }}</span>
                        <a href="javascript:void(0);" data-attachement-download="true" class="line-block-box absolute snap-top-right text-center">
                              <i class="hidden download-icon">&arrw;</i>
                        </a>
                    </div>
                </div>
          </div>
     </div>
  </li>
</template>

<script>
    export default {
        props: {
          posted:Boolean,
          author:String,
          text:String,
          avatarThumbnail:String
        }
    };
</script>

<style scoped>
  .comment-list-item {
    padding: 10px 0;
    min-height:32px;
  }

  .comment-list-item a[data-attachement-download="true"]{
    padding:29px 18px;
    background-color:#444444;
    color:#ffffff;
  }

  .comment-list-item [data-attachement-download="true"] > .download-icon {
    padding:4px;
    font-size:11px;
  }

  .comment-list-item > .comment-box-post {
    width: 100% !important;
  }

  .comment-intermediate {
    opacity:0.34 !important;
    pointer-events:none !important;
    cursor: progress !important;
  }
</style>
