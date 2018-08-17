<template>
    <div class="comment-row">
         <div class="comment-box-mention comment-box-sticker-enabled relative clearfix" direction="left">
                <div class="pull-left left-float">
                     <div class="img link-box margin-l5 comment-image-box">
                              <img :alt="cAuthor" class="img thumb-box-small" :src="cAvatarThumb">

                     </div>
               </div>

               <div class="no-pull">
                      <div class="comment-body-box variable-width-box">
                           <div class="comment-body-container">
                                <div class="comment-body-input-container">
                                    <div class="relative">

                                     <input class="screened hidden" name="add_comment_text" id="add_comment_text" tabindex="-1">
 
                                          <div class="comment-body-input block-box comment-body-input-context">
                                                <div class="comment-body-input-control" tabindex="-2">
                                                  
                                                     <div class="relative block-box">

                                                           <div class="comment-input-control-placeholder-wrapper absolute">

                                                                   <div class="comment-input-control-placeholder" id="commentbox-placeholder" v-text="textPlaceholder"><!--Post your comment...--></div>

                                                            </div>
 
                                                     <div class="relative" id="comment-border" data-contents-box="true" contenteditable="false">

                                                              <div aria-describedby="commentbox-placeholder" aria-expanded="false" aria-haspopup="false" aria-hasdropdown="true" id="comment-text-area-wrapper" class="comment-text-area-wrapper"  v-editable-text autocorrect="off" autocomplete="off" spellcheck="true" role="commentbox">

                    <div data-contents="true" class="comment-text-area">

                          <div data-block="true" data-editor="comment-text-area">

                                  <div data-offset-width="1" class="relative" id="comment-text-area-strip">

                                      <span data-offset-key="xy-0-0" id="comment-text-area-cursor" v-model="text"><br data-text="true">
                                      </span>

                                 </div>
                          </div>

                    </div>


    </div>

    </div>

    <div id="comment-text-area-mention-box" class="absolute">
        <slot></slot>
    </div>



    </div>
    </div>
    </div>

                  <a href="javascript:void(0);" class="line-block-box absolute snap-top-right text-center comment-clear" id="comment-clear" title="Clear comment">
                              &times;
                  </a>
    </div>


                                <div class="text-right">

                                           <div class="line-block-box clearfix relative comment-taskbar" id="comment-taskbar">

                <a class="line-block-box pull-left relative comment-icon comment-icon-file" href="javascript:void(0);" title="Attach a File, Photo or Video"  data-hover="tooltip" data-tooltip="#attach-file">

                     <input type="file" ref="attachment" value="" accept="video/x-m4v, video/webm, video/x-ms-wmv, video/x-msvideo, video/3gpp, video/flv, video/x-flv, video/mp4, video/quicktime, video/mpeg, video/ogv, image/png, image/jpg, image/jpeg, image/gif, application/pdf, application/zip" class="hidden" name="file"><!-- IE 9 doesn't support ` multiple="multiple"` attribute for file inputs so we can't add it for now -->
                     <icon href="attachment"></icon>
                </a>

                <a class="line-block-box pull-left relative comment-icon comment-icon-link" href="javascript:void(0);" title="Insert a Link"  data-hover="tooltip" data-tooltip="#attach-link">
                      <input type="hidden" name="links" value="{}" class="hidden">
                      <icon href="link"></icon>
                </a>

                <a class="line-block-box pull-left relative comment-icon comment-icon-emoji" href="javascript:void(0);" title="Insert an Emoji"  data-hover="tooltip" data-tooltip="#attach-emoji">
                      <input type="hidden" name="emojis" value="{'happy-surprised':'em-svg em-1f604', 'sad':'em-svg em-1f6', 'angry':'em-svg em-1f620', 'victory-hand':'em-svg em-270C'}" class="hidden">
                      <icon href="emoji"></icon>
                </a>



         <span v-on:click="onClick" class="line-block-box pull-left comment-button text-center" data-hover="tooltip" title="Send in your comment">

                <a tabindex="0" href="javascript:void(0);" class="line-block-box comment-button-text">OK</a>

         </span>

</div>

</div>

</div>
</div>
</div>
</div>
   </div>
        <section id="attach-file" class="absolute" role="dropup-menu" aria-target="[]">
        
            <span role="arrow"></span>
        </section>
        <section id="attach-link" class="absolute" role="dropup-menu" aria-target="[]">
        
            <span role="arrow"></span>
        </section>
        <section id="attach-emoji" class="absolute" role="dropup-menu" aria-target="[]">
        
            <span role="arrow"></span>
        </section>
   </div>
</template>

<script>
    import * as Helpers from '@/utils/helpers'
    import CommentBoxIcon from "./CommnetBoxIcon.vue"

    export default {
        components: { CommentBoxIcon }
        props:{
            textPlaceholder:{
                    type:String,
                    required:true
            },
            cAuthor:String,
            cAvatarThumb:String
        },
        data() {
            return {
                text: ""
            }
        },
        directives:{
            editableText: {

                    _savedSelection: null, // Default Value

                    inserted(){
                     
                     
                    },
                     
                    componentUpdated(){
                     
                    },

                    bind(el, binding, vnode, oldVnode) {

                       var  self = this,
                            el   = self.el,
                            bd_el = el.parentNode,
                            ESCAPE_KEY      = 27,
                            ENTER_KEY       = 13,
                            BACKSPACE_KEY    = 8,
                            DOWNARROW_KEY  = 40,
                            RIGHTARROW_KEY = 39,
                            attrToChange    = 'textContent';

                        // Make the content editable
                        /*if(('chrome' in window) 
                            && ('WebkitAppearance' in document.documentElement.style)){
                            el.setAttribute('contenteditable', 'plaintext-only'); // Chrome [ Webkit / Blink ] - ONLY   
                        }else{*/
                            el.setAttribute('contenteditable', true); // other browsers
                        /*}*/

                        // On escape, reset to the initial value and deselect (blur)
                        self.onEsc = function(e) {
                            if (e.keyCode === ESCAPE_KEY) {
                                el[attrToChange] = self.initialValue || ''
                                self._set();
                                el.blur();
                            }
                        }
                        
                        self.onBlur = function(e){
                        
                             console.log("blurred! "+ e.target.className);

                             var placeholder = document.querySelector('#commentbox-placeholder');
                             var text_input = e.target.querySelector('#comment-text-area-cursor');
                             var text = (text_input.innerText)
                                        ? text_input.innerText 
                                        : text_input.textContent;

                             if(text_input 
                                    && text.match(/^(?:[\s]*)$/)){
                                  placeholder.style.display = "block";
                             }
                        };

                        self.onPaste = function(e){
                                 console.log("pasted!");

                                 var dataToBePasted = (typeof window.clipboardData === 'object')
                                                        ? window.clipboardData.getData('Text') 
                                                        : e.clipboardData.getData('text/plain');

                                 if(!dataToBePasted){
                                    // don't allow pasting
                                    e.preventDefault(); // document.execCommand("paste", false, "");
                                 }

                                 if(document.selection 
                                    && parseInt(document.documentMode) <= 9){
                                    
                                    document.selection.createRange().text += window.toStaticHTML(dataToBePasted);
                                }
                        };

                        el.addEventListener("paste", self.onPaste);

                        el.addEventListener('keyup', this.onEsc);
                        
                        el.addEventListener('blur', this.onBlur);
                        
                        self.onMouseIn = function(e){
                        
                              console.log("cursor probably moved!");
                              
                              var watcher = e.target.querySelector('#comment-text-area-cursor');
                              var watcherLineHeight = 16;
                              var numOfLines = Math.floor((watcher.offsetHeight + 2) / watcherLineHeight);
                              var rect = watcher.parentNode.getBoundingClientRect();
                              
                              // move @-mention dropdown as the cursor <span> element goes along
                              var mentionDropDown = e.target.querySelector('#comment-text-area-mention-box');
                              var xy = Helpers.getSelectionCursorChoords(e, watcher);
                              var _xy = {x : rect.left, y : rect.top};

                             if(e.target.innerHTML.length == 0){
                                  mentionDropDown.style.top = (watcher.offsetHeight + 2) + "px";
                             }else{
                                  mentionDropDown.style.top = ((xy.y - _xy.y - 1)  + watcherLineHeight) + "px";
                             }  

                             mentionDropDown.style.left = (xy.x - _xy.x) + "px";
                             
                             // console.log("mouse -> x: "+(xy.x - _xy.x)+", y:"+(xy.y - _xy.y));

                        };

                        self.onKeys = function(e) {
                            /*if (e.keyCode === ENTER_KEY) {
                                e.preventDefault();
                                //el.blur();
                            }*/
                            
                             var selection;
                             var range;
                             var br;
                             var anchorOffset; // caret position inside the text area cursor element
                             var pos;
                             var clonedRange;
                             var newRange;
                             var span;

                             var watcher = e.target.querySelector('#comment-text-area-cursor');
                             var watcherLineHeight = 16;
                             var numOfLines = Math.floor((watcher.offsetHeight + 2) / watcherLineHeight);
                             var rect = watcher.parentNode.getBoundingClientRect();
                             
                              // move @-mention autocomplete dropdown as the cursor <span> element goes along
                              
                             var mentionDropDown = document.querySelector('#comment-text-area-mention-box');
                             var xy = Helpers.getSelectionCursorChoords(e, watcher);
                             var _xy = {x : rect.left, y : rect.top};
                             if(e.target.innerHTML.length == 0){
                                  mentionDropDown.style.top = (watcher.offsetHeight + 2) + "px";
                             }else{
                                  mentionDropDown.style.top = ((xy.y - _xy.y - 1) + watcherLineHeight) + "px";
                             }     

                             mentionDropDown.style.left = (e.keyCode === 8 ? ((xy.x - _xy.x) < 7 ? (xy.x - _xy.x) : ((xy.x - _xy.x) - 7)) : ((xy.x - _xy.x) + 7)) + "px";
                             
                             range = Helpers.getCurrentTextRange();

                             // console.log("key -> x: "+(xy.x - _xy.x)+", y:"+(xy.y - _xy.y));

                              if(e.keyCode === BACKSPACE_KEY){ // backspace

                                  if(!document.documentMode 
                                        ||  document.documentMode >= 9){

                                      if(!selection
                                          || !selection.isCollapsed 
                                            || !selection.rangeCount){

                                          return;
                                      }

                                      if(range 
                                            && range.commonAncestorContainer.nodeType === 3 
                                              && range.startOffset > 0){

                                            return;
                                      }


                                  }else{ // IE 8

                                        if(!selection.collapsed){
                                            return;
                                        }

                                  }
                              }


                             if(e.keyCode === BACKSPACE_KEY 
                                && ((xy.x - _xy.x) === 0)
                                 && ((xy.y - _xy.y) === 0)){
                                console.log("backspace limit reached!!!");
                                e.preventDefault();
                                return false;
                             }

                             if(e.keyCode === RIGHTARROW_KEY || e.keyCode === DOWNARROW_KEY){

                                  if(e.target.innerText.match(/^(?:[\s]*)$/)){
                                       e.preventDefault();
                                  }else{
                                     if((xy.x - _xy.x) < watcher.parentNode.offsetWidth && /* there is no text after the current cursor position in the range */ true){
                                          e.preventDefault();
                                     }
                                  }
                             }

                             if(e.keyCode === ENTER_KEY){

                                 if(window.getSelection){

                                    e.preventDefault();
                                    e.stopPropagation(); // disabling event bubbling does sometimes affect cursor on scroll event...
                                    // Opera/Firefox/Chrome/Safari and other Presto-based/Gecko-based/Webkit-based/Blink-based engines

                                    br = document.createElement('br'); // range.createContextualFragment('<br>')
                                    selection = window.getSelection();

                                    if((('oscpu' in navigator)
                                        || ({}).hasOwnProperty.call(navigator, 'oscpu') === true)){
                                        br.setAttribute('data-mozdirty', 'true'); // Specific to Firefox
                                    }else if(('opera' in window)
                                                && (({}).toString.call(window.opera).toLowerCase() === '[object opera]')){
                                        br.setAttribute('data-presto-hack', 'true');
                                    }else{
                                        br.className = '--WEBKIT-BR-HACK'; // Specific to Chrome/Safari/New Opera
                                    }


                                    range.deleteContents();
                                    range.insertNode(br);

                                    if(!('opera' in window)
                                          || (typeof window.opera.version !== 'function')){

                                        range = document.createRange();

                                        range.setStartAfter(br);
                                        range.setEndAfter(br);

                                        range.collapse(false);

                                    }else{

                                        anchorOffset = selection.anchorOffset;

                                        clonedRange = range.cloneRange();
                                        clonedRange.selectNodeContents(watcher);
                                        clonedRange.setEnd(range.endContainer, range.endOffset);
                                        pos = clonedRange.toString().length;


                                        range = document.createRange();

                                        if(selection.anchorNode !== this){

                                            span = document.createElement('span');
                                            span.appendChild(document.createTextNode("\u200b"));

                                            watcher.appendChild(span);

                                            range.selectNode(span);

                                        }

                                        range.setStartAfter(span);
                                        range.setEndAfter(span);

                                    }

                                    selection.removeAllRanges();
                                    selection.addRange(range);

                                    if(span){
                                       watcher.removeChild(span);
                                    }

                                    return false;

                                 }else if(/*@cc_on!@*/0
                                          && document.documentMode === 8){

                                      e.returnValue = false;
                                      e.cancelBubble = true; // disabling event bubbling does sometimes affect cursor on scroll event...
                                      // IE a.k.a the only Trident-based engine

                                      range.pasteHTML('<BR><SPAN class="--IE-BR-HACK"></SPAN>');
                                      // range.moveToElementText(selection.node);
                                      range.moveEnd('character', 1);
                                      range.moveStart('character', 1);
                                      range.collapse(false);

                                      return false;
                                 }
                              }   
       
                        };
                        
                        bd_el.addEventListener('mousedown', this.onMouseIn);

                        el.addEventListener('keydown', this.onKeys);

                        // On focus, store the initial value so it can be reset on escape
                        self.onFocus = function(e) {
                        
                            self.initialValue = el[attrToChange];
                            
                                 console.log("focused! "+ e.target.className);
                            
                                 var placeholder = document.querySelector('#commentbox-placeholder');
                                 var watcher = e.target.querySelector('#comment-text-area-cursor');



                                 if((window.getComputedStyle(placeholder, "").getPropertyValue('display')) == "block"){
                                      placeholder.style.display = "none";
                                 }
                            
                        };
                        
                        self.onCut = function(e){
                        
                             console.log("deleted!");

                             var watcher = e.target.querySelector('#comment-text-area-cursor');
                             var spaceIndex = watcher.innerHTML.search(/<br data-text="true">(?:&nbsp;|\s*)$/);
                             if(spaceIndex > -1){
                                    watcher.innerHTML = watcher.innerHTML.replace(
                                        /<br data-text="true">(?:&nbsp;|\s*)$/,
                                        '<br data-text="true">'
                                    );
                             }
                        };

                        el.addEventListener('focus', this.onFocus);
                        
                        el.addEventListener('cut', this.onCut);

                        self.clearClick = function(e){
                            console.log("cleared!");

                            var watcher = e.target.parentNode.querySelector('#comment-text-area-cursor');
                            var wrapper = e.target.parentNode.querySelector('#comment-text-area-wrapper');
                            var mentionDropDown = e.target.parentNode.querySelector('#comment-text-area-mention-box');

                            mentionDropDown.style.left = "0px";
                            mentionDropDown.style.top = "16px";
                            watcher.innerHTML = '<br data-text="true">';

                            wrapper.focus();
                            wrapper.blur();
                        };

                        el.querySelector('#comment-clear').addEventListener("click", self.clearClick); 

                        self.onInput = function (e) {
                        
                            console.log("inserted!"); /* e.isTrusted */
                            
                             var watcher = e.target.querySelector('#comment-text-area-cursor');
                             var children = [].slice.call(watcher.childNodes);
                             var formInput = document.querySelector('#add_comment_text');
                             var scripts = /(<|%3C)script .*?(>|%3E)([\w\s\S]+)(\1)\/script(\2)/;
                             var text = '';
                             var scriptsCheck;

                             // check for malicious code within input text and clean out!! @-XSS
                             scriptsCheck = watcher.innerHTML.match(scripts);

                             if(scriptsCheck){
                                 if(/*@cc_on!@*/0){
                                    watcher.innerHTML = window.toStaticHTML(watcher.innerHTML);
                                 }else{ 
                                    watcher.innerHTML = watcher.innerHTML.substring(scriptsCheck.index, scriptsCheck[0].length);
                                 }
                             }


                             // clean out the cursor <span> element for pasted text and 
                             for(var j=0; j < children.length; j++){
                                if(children[j].nodeType == 1){
                                  if(!(children[j].nodeName.match(/A|BR|B|I|IMG/i))){
                                      if(children[j].nodeName == "SPAN"
                                         && children[j].className.match(/--IE-BR-HACK|CURSOR-POS-HACK/g)){
                                          continue;
                                      }
                                      text += children[j].innerHTML.replace(/(?:<.*?>|<\/.*>)/ig, '');
                                      watcher.removeChild(children[j]);
                                  }  
                                }else if(children[j].nodeType == 3){
                                    if(children[j].nodeName == "#text" && children[j].nodeValue == ""){
                                        watcher.removeChild(children[j]);
                                    }
                                }
                             }
                             
                             formInput.value = watcher.innerHTML;
                        
                            // if this directive has filters
                            // we need to let the vm.$set trigger
                            // update() so filters are applied.
                            // therefore we have to record cursor position (selection)
                            // so that after vm.$set changes the input
                            // value we can put the cursor back at where it is
                            this._savedSelection = Helpers.saveSelection(el);

                            self._set();
                        }

                        if(!document.documentMode
                            || document.documentMode < 9){
                            el.addEventListener('input', self.onInput); // other browsers
                        }else{
                            el.addEventListener('textinput', self.onInput); // IE 9 support
                        }
                        
                        // FIXME: We don't support IE 9 so I never solved whatever issues exist with backspace / del / cut
                    },

                    _set: function () {
                        this.vm.$set(this.key, this.el[attrToChange])
                    },

                    update: function (value, init) {
                        
                        // sync back inline value if initial data is undefined
                        if (init && value === undefined) {
                            return this._set()
                        }

                        this.el[attrToChange] =  typeof value !== 'string' ? '' : value

                        // Since updates are async, we need to reset the position of the cursor after it fires
                        // v-model tries to do this with setTimeout(cb, 0) but if there's a filter and you type
                        // too fast, there's a race condition where the timeout can fire before
                        // update, moving the cursor back to the front. Having this here guarantees the cursor
                        // is reset after update.
                        // See the comment in self.set for additional context
                        if (this._savedSelection) {
                            Helpers.restoreSelection(this.el, this._savedSelection)
                        }
                    },

                    unbind: function () {
                        var el = this.el;
                        el.removeEventListener('input', this.onInput)
                        el.removeEventListener('keyup', this.onEsc)
                        el.removeEventListener('keydown', this.onEnter)
                        el.removeEventListener('focus', this.onFocus)
                    }
            }
        },
        methods: {
            // Handle OK button click
            onClick(event) {
                if (this.text !== "") {
                    // Dispatch event to parent components
                    this.$dispatch("new-comment", {
                        text: (Helpers.textRangeToHTML() || this.text)
                    });
                    
                    this.vm.$emit('send', event);

                    // Reset Form
                    this.text = "";
                }
            },
            // Handle when a file is attached
            onFileAttach(e){
                    console.log(e.target.files);
            },
            onLinkCreate(e){
                var href = window.prompt('Enter the web address for the link', '');
                
                if(href !== ''){
                    Helpers.insertNodeAtCursor(
                        Helpers.convertDOMToHTML(
                            '<a class="link-text" href="' + href + '">'
                            + href + '</a>'
                        )
                    );
                }
            },
            onEmojiSelect(e){
                let emoji = Helpers.createEmojiAsImageFromName(
                        e.target.attributes.getNamedItem('data-emoji-name')
                    );

                Helpers.insertNodeAtCursor(emoji);
            }
        }
    };
</script>

<style scoped>

#comment-border .comment-text-area-wrapper {
  display: block;
  outline: none;
  outline: 0;
  /*overflow-y:auto;*/
  /*tab-size:4;*/
  /*-moz-tab-size:4;*/
  text-align:left;
  /*word-wrap: break-word;*/
  /*white-space: -moz-pre-wrap;  Firefox 1.0-2.0 */
  /*white-space: pre-wrap;      Modern browsers */
  /*white-space: pre-line;*/
  width:100%;
}

/*#comment-text-area-cursor {
   display:inline-block;
   width:100%;
}*/

#comment-text-area-cursor:empty:before {
  content: "\200B";
  display: inline;
}

#comment-text-area-mention-box {
  z-index:5;
  width:190px;
  min-height:1px;
  padding:0;
  left:0;
  top:16px;
}

#comment-text-area-strip {
  overflow:visible;
  font-family:monospace;
  font-variant-ligatures: none;
  -webkit-user-select: text;
  -moz-user-select:-moz-text;
  -moz-user-select:text;
  ms-user-select:text;
  user-select:text;
}

.comment-taskbar { /* comment-taskbar */
  border:1px solid #999999;
  border-radius:3px;
  -webkit-border-radius:3px;
  -moz-border-radius:3px;
  margin-top:10px;
  behavior:url('https://cdn.jsdelivr.net/css3pie/2.0b1/PIE.htc');
}

.comment-box-wrapper .comment-clear {
  padding:7px;
  z-index:5;
}

.comment-taskbar .comment-icon {
  padding:13px;
  margin-left:3px;
  border-left:1px solid #dddddd;
  top:3px;
}

/*.comment-taskbar .comment-icon-file {

}

.comment-taskbar .comment-icon-link {

}

.comment-taskbar .comment-icon-emoji {

}*/

.comment-taskbar .comment-button {
  border-left:1px solid #999999;
  width:45px;
}

.comment-taskbar .comment-button .comment-button-text {
  width:100%;
  padding:7px 0;
}

.comment-row .comment-input-control-placeholder { 
    color: #90949c;
    z-index: 0;
    font-family:Arial;font-size:13px;
}

.comment-row .comment-image-box { 
   margin:0;
}

.comment-body-input-context {
    background: #ffffff;
    border: 1px solid #bdc7d8;
    box-sizing: border-box;
    cursor: text;
    font-family: Helvetica, Arial, sans-serif;
    font-size: 11px;
    padding: 3px;
}

.comment-form .comment-box-sticker-enabled .block-box .comment-body-input-control {
    padding-right: 57px;
}

.comment-box-wrapper .block-box .comment-body-input-control {
    padding-right: 29px;
}

.comment-box-wrapper .comment-text-area-curosr a[class^="link"]{
    cursor: default;
    text-decoration: underline;
}

.comment-taskbar a[href^="javascript:void(0)"],
.comment-taskbar a[data-tooltip|="hover"] {
    color: #365899;
    cursor: pointer;
    text-decoration: none;
}

.comment-body-container .comment-body-input {
    font-size: 12px;
    line-height: 16px;
    padding-left: 5px;
}

.comment-body-box .normalize-height {
    min-height:1px;
    line-height:0.95;
}

.comment-body-box .comment-text-block {
  padding-right:40px;
  font-family:Arial;
  font-size:13px;
  margin-top:1px;
  color:#777777;
}

.comment-body-box .comment-body-container .comment-body-input {
    border-color: #dddfe2;
    min-height: 32px;
    padding-bottom: 7px;
    padding-top: 7px;
}

iframe[name="comment-box-sink"] {
    left:-9999px;
    top:0;
}

section[role="dropup-menu"] span[role="arrow"] {
    /* triangle CSS */
}

section[role="dropup-menu"] {
    z-index:300;
    width:120px;
    height:180px;
    background-color:white;
}
</style>
