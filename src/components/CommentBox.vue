<template>
    <section class="comment-box">
      <form ref="form" class="comment-form" method="POST" :action="boxAction" :enctype="'multipart/form-data'" v-on:reset.prevent v-cloak :target="'comment-box-sink'">
        <fieldset class="comment-box-wrapper">
            <comment-list :comments="comments"></comment-list>
            <comment-input v-on:send="onFormSend" :text-placeholder="inputPlaceholderText" :c-author="contextAuthor" :c-avatar-thumb="contextAvatarThumb"></comment-input>
        </fieldset>
        <iframe :src="'about:blank'" :name="'comment-box-sink'" :id="'comment-box-sink'" class="absolute" :marginheight="'0'" :marginwidth="'0'" :scrolling="'no'" :height="'0'" :width="'0'" :allowtransperency="'true'" :frameborder="'0'"></iframe>
      </form>
      <svg style="display:none;" xmlns="http://www.w3.org/2000/svg">
            <symbol id="link" viewBox="0 0 18 18">
                <path :fill="`#${iconFillColor}`" d="M6.879 9.934c-0.208 0-0.416-0.079-0.575-0.238-1.486-1.486-1.486-3.905 0-5.392l3-3c0.72-0.72 1.678-1.117 2.696-1.117s1.976 0.397 2.696 1.117c1.486 1.487 1.486 3.905 0 5.392l-1.371 1.371c-0.317 0.317-0.832 0.317-1.149 0s-0.317-0.832 0-1.149l1.371-1.371c0.853-0.853 0.853-2.241 0-3.094-0.413-0.413-0.963-0.641-1.547-0.641s-1.134 0.228-1.547 0.641l-3 3c-0.853 0.853-0.853 2.241 0 3.094 0.317 0.317 0.317 0.832 0 1.149-0.159 0.159-0.367 0.238-0.575 0.238z" />
                <path :fill="`#${iconFillColor}`" d="M4 15.813c-1.018 0-1.976-0.397-2.696-1.117-1.486-1.486-1.486-3.905 0-5.392l1.371-1.371c0.317-0.317 0.832-0.317 1.149 0s0.317 0.832 0 1.149l-1.371 1.371c-0.853 0.853-0.853 2.241 0 3.094 0.413 0.413 0.962 0.641 1.547 0.641s1.134-0.228 1.547-0.641l3-3c0.853-0.853 0.853-2.241 0-3.094-0.317-0.317-0.317-0.832 0-1.149s0.832-0.317 1.149 0c1.486 1.486 1.486 3.905 0 5.392l-3 3c-0.72 0.72-1.678 1.117-2.696 1.117z"/>
            </symbol>
            <symbol id="attachment" viewBox="0 0 18 18">
                <path :fill="`#${iconFillColor}`" d="M10.404 5.11l-1.015-1.014-5.075 5.074c-0.841 0.841-0.841 2.204 0 3.044s2.204 0.841 3.045 0l6.090-6.089c1.402-1.401 1.402-3.673 0-5.074s-3.674-1.402-5.075 0l-6.394 6.393c-0.005 0.005-0.010 0.009-0.014 0.013-1.955 1.955-1.955 5.123 0 7.077s5.123 1.954 7.078 0c0.004-0.004 0.008-0.009 0.013-0.014l0.001 0.001 4.365-4.364-1.015-1.014-4.365 4.363c-0.005 0.004-0.009 0.009-0.013 0.013-1.392 1.392-3.656 1.392-5.048 0s-1.392-3.655 0-5.047c0.005-0.005 0.009-0.009 0.014-0.013l-0.001-0.001 6.395-6.393c0.839-0.84 2.205-0.84 3.045 0s0.839 2.205 0 3.044l-6.090 6.089c-0.28 0.28-0.735 0.28-1.015 0s-0.28-0.735 0-1.014l5.075-5.075z"/>
            </symbol>
            <symbol id="emoji" viewBox="0 0 18 18">
                <path :fill="`#${iconFillColor}`" d="M8 16c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zM8 1.5c3.59 0 6.5 2.91 6.5 6.5s-2.91 6.5-6.5 6.5-6.5-2.91-6.5-6.5 2.91-6.5 6.5-6.5zM4 5c0-0.552 0.448-1 1-1s1 0.448 1 1c0 0.552-0.448 1-1 1s-1-0.448-1-1zM10 5c0-0.552 0.448-1 1-1s1 0.448 1 1c0 0.552-0.448 1-1 1s-1-0.448-1-1zM11.002 9.801l1.286 0.772c-0.874 1.454-2.467 2.427-4.288 2.427s-3.413-0.973-4.288-2.427l1.286-0.772c0.612 1.018 1.727 1.699 3.002 1.699s2.389-0.681 3.002-1.699z"/>
            </symbol>
      </svg>
    </section>
</template>

<script>
    import * as Ajax from "@/utils/ajax"
    
    import EmojiCSS from  'https://afeld.github.io/emoji-css/emoji.css'
    
    import CommentList from "./CommentList.vue";
    import CommentInput from "./CommentInput.vue";

    export default {
        name: 'comment-box',
        components: { CommentList, CommentInput },
        props:{
          iconFillColor:{
                type:String,
                required:true,
                default:'000000'
          },
          inputPlaceholderText:{
                type:String,
                required:true,
                default:'Start typing...'
          },
          contextAuthor:String,
          contextAvatarThumb:String,
          boxAction:{
                type:String,
                required:true,
                default:`${window.location.origin}/comments/send`
          },
          useXhr:{
                type:Boolean,
                required:true,
                default:true
          },
          comments:{
               type:Array,
               required:true,
               default:[]
          }
        },
        data () {
            return {
                currentComment:null,
                comments: this.comments /*[
                    {avatar_thumbnail:"", author: "Mike", text: "This is a comment"},
                    {avatar_thumbnail:"", author: "Joe", text: "This is another comment"},
                ]*/
            }
        },
        events: {
            // Add new comment
            "new-comment": (comment) => {
                comment.avatar_thumbnail = this.conetxtAvatarThumb;
                comment.author = this.contextAuthor;

                this.currentComment = this.vm.$emit('new-comment-dispatch', comment);

                this.comments.push(comment);
            }
        },
        methods:{
            validate(){
                    
                    // Validate input {hidden} fields...
            },
            createResponseCallback(component){

                return (data) => {

                    component.$emit('new-comment-saved', data);

                }
            },
            onFormSend(event){
                
                this.validate();

                // this.$refs.form.chechValidity();
                // this.$refs.form.reportValidity();

                this.currentComment;

                this.$emit('beforesend', [this.$refs.form]);

                let promise = Ajax.sendHttpRequest(this.$refs.form, this.useXhr);

                if(promise !== null){
                    promise.then(
                        this.createResponseCallback(this)
                    );
                }

            }
        }
    }
</script>

<style>


.relative{
   position:relative;
}

.absolute{
  position:absolute;
}

.fixed {
  position:fixed;
}

.snap-top-right{
   left:auto;
   bottom:auto; 
   top:0;
   right:0;
}

.snap-top-left{
   right:auto;
   bottom:auto; 
   top:0;
   left:0;
}

.snap-off{
   right:auto;
   bottom:auto;
   top:-99999px;
   left:-99999px;
}

.snap-bottom-left{
    top:auto;
    right:auto;
    bottom:0;
    left:0;
}


[hidden],
.hidden {
  display: none !important;
}


.scrollable-x{
   overflow: auto; /* disbale all prior settings */
   overflow-y: hidden;
   -ms-overflow-y: hidden; /* IE8 */
}

.scrollable-y{
   overflow: auto; /* disbale all prior settings */
   overflow-x: hidden;
   -ms-overflow-x: hidden; /* IE8 */
}

.not-scrollable{
   overflow: hidden; /* all browsers */
   overflow-x: hidden; /* all except IE */
   -ms-overflow-x: hidden; /* IE7,8 */
   overflow-y: hidden;
   -ms-overflow-y: hidden; /* IE7,8 */
   -ms-overflow-style: none; /* IE10+ */
}

.auto-scrollable{
   overflow: auto; /* all browsers */
   overflow-x: auto; /* all except IE */
   -ms-overflow-x: auto; /* IE7,8 */
   overflow-y: auto;
   -ms-overflow-y: auto; /* IE7,8 */
   -ms-overflow-style: none; /* IE10+ */
}

.scrollable{
   overflow:auto;
   position:relative;
   /* apply only to IE7 and less - star hack! */
   *padding-bottom: 1.3em;
}

.unselectable { /* mimicks the `unselectable` proprietary attribute as in Internat Explorer */
  -webkit-user-select:none;
  -moz-user-select:-moz-none;
  -moz-user-select:none;
  ms-user-select: none;
  user-select: none;
}

/* oldOpera/oldIE will implement "unselectable" class using JavaScript only */

.v-align-center{
    vertical-align:middle;
}

.v-align-top{
    vertical-align:top;
}

.block-box{
      display:block;
      height:auto !important;
}

/* Firefox (FF3-4) has a different way of setting "inline-block" behaviour on all DOM elements */

.line-block-box,
.line-inline-box{
    display:-moz-inline-stack;
    display:-moz-inline-box;
    display:inline-block; 
}

/* Because IE 6/7/8 do not set "inline-block" on block-level DOM elements */ 

*:first-child+html .line-block-box,
* html .line-block-box{ 
      *display:inline;
      *zoom:1; /* trigger hasLayout */
}

.invisible {   
    visibility: hidden;
}

.pull-left {
    float: left !important;
}

.pull-right {
    float: right !important;
}

.left-float {
    float: left;
}

.right-float {
    float: right;
}

.thumb-box {
    height: 50px;
    width: 50px;
}

.thumb-box-small { 
    height: 32px;
    width: 32px;
}

.icon-box{
    height: 15px;
    width: 15px;
}

.screened { 
    left: -99999px;
    opacity: 0;
    position: absolute;
}

.icon-box-small{
  height: 11px; 
  width: 11px;
}

ol li,
ul li{
    list-style-type: none;
    margin: 0;
}

ol,
ul{
    margin: 0;
    padding: 0;
}

.margin-l5 {
    margin-left: 5px;
}

.margin-l6 {
    margin-left: 6px;
}

.margin-l7 {
    margin-left: 7px;
}

.margin-l8 {
    margin-left: 8px;
}

.margin-r5 {
    margin-right: 5px;
}

.margin-r6 {
    margin-right: 6px;
}

.margin-r7 {
    margin-right: 7px;
}

.margin-r8 {
    margin-right: 8px;
}

.margin-n-r12 {
   margin-right: -12px;
}

.margin-n-r10 {
   margin-right: -10px;
}

.low-light {
  color: #90949c;
}

.lower {
    text-transform:lowercase;
}

.upper {
    text-transform:uppercase;
}

.capital {
    text-transform:capitalize;
}

.text-emphasis {
  font-weight:bold;
}

.tablet {
    border-radius:3px;
    -moz-border-radius:3px;
    -webkit-border-radius:3px;
    -o-border-radius:3px;
    border-radius:3px;
   -khtml-border-radius:3px;
}

.pill {   
   border-radius:4px;
   -moz-border-radius:4px;
   -webkit-border-radius:4px;
   -o-border-radius:4px;
   -khtml-border-radius:4px;
}

.ie-set .tablet,
.ie-set  .pill {
    position:relative;
    behavior:url('https://cdn.jsdelivr.net/css3pie/2.0b1/PIE.htc');
}

.pill .btn.last:last-child {
    border:none;
}

a.button,
button.button,
input[type='button'].button,
input[type='submit'].button{ /* can be used for <a> <button> <span> */
line-height:1.42857143;
text-align:center;
white-space: nowrap;
vertical-align: middle;
-ms-touch-action: manipulation;
    touch-action: manipulation;
-webkit-user-select: none;
-moz-user-select: none;
-ms-user-select: none;
    user-select: none;
background:transparent;
cursor:pointer;
color:transparent;
font-weight:normal;
font-style:normal;
font-variant:normal;
letter-spacing:normal;
height:auto;
padding:8px 6px;
font-size:16px;
border-style:solid;
border-width:1px;
text-decoration:none;
}

button.button,
input[type='button'].button,
input[type='submit'].button{
-pie-track-hover:false;
-pie-track-active:false;
}


html .variable-width-box{ 
    overflow: hidden !important;
}

.text-left{
  text-align: left;
}

.text-right{
  text-align: right;
}

.text-center{
  text-align: center;
}

.comment-box {
    width:auto !important;
    min-height:220px;
    height:inherit;
    *height:250px;
    margin:0;
    display:block !important;
}

.comment-box-wrapper img {
    border:0;
}

.comment-box-wrapper input {
  outline:0;
  outline: none;
}

.comment-list-row,
.comment-row { 
    background-color: #f5f5f5; /*#e9ebee;*/
    margin-top: 1px;
    padding: 10px;
    word-wrap: break-word;
}

.comment-box .comment-body-box { 
    margin: 0;
    padding-left: 8px;
}


</style>
