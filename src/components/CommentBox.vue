<template>
    <section class="comment-box">
      <form ref="form" class="comment-form" method="POST" :action="boxAction" :enctype="'multipart/form-data'" v-on:reset.prevent v-cloak :target="'comment-box-sink'">
        <fieldset class="comment-box-wrapper">
            <comment-list :comments="comments"></comment-list>
            <comment-input v-on:send="onFormSend" :text-placeholder="inputPlaceholderText" :c-author="contextAuthor" :c-avatar-thumb="contextAvatarThumb"></comment-input>
        </fieldset>
      </form>
    </section>
</template>

<script>
    import Ajax from "@/utils/ajax";

    import CommentList from "./CommentList.vue";
    import CommentInput from "./CommentInput.vue";

    export default {
        components: { CommentList, CommentInput },
        props:{
          inputPlaceholderText:String,
          contextAuthor:String,
          contextAvatarThumb:String,
          boxAction:String,
          useXhr:Boolean,
          comments:Array
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

                    component.vm.$emit('new-comment-saved', data);

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
        },
        render(cr){
            var autocomplete = this.vm.$slot.autocomplete;
            var links = this.vm.$slot.link;

            //this.$el;
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
