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
        directives:{
                editableText: {

   _savedSelection: null, // Default Value

     inserted:function(){
     
     
     },
     
     componentUpdated:function(){
     
     },

   bind: function (el, binding, vnode, oldVnode) {

       var self = this,
+            el   = self.el
+
+        // Make the content editable
+        el.setAttribute('contenteditable', true)
+
+        // On escape, reset to the initial value and deselect (blur)
+        self.onEsc = function(e) {
+            if (e.keyCode === ESCAPE_KEY) {
+                el[attrToChange] = self.initialValue || ''
+                self._set()
+                el.blur()
+            }
+        }
+        el.addEventListener('keyup', this.onEsc)
+
+        self.onEnter = function(e) {
+            if (e.keyCode === ENTER_KEY) {
+                e.preventDefault()
+                el.blur()
+            }
+        }
+        el.addEventListener('keydown', this.onEnter)
+
+        // On focus, store the initial value so it can be reset on escape
+        self.onFocus = function() {
+            self.initialValue = el[attrToChange]
+        }
+        el.addEventListener('focus', this.onFocus);
+
+        self.onInput = function (e) {
+            // if this directive has filters
+            // we need to let the vm.$set trigger
+            // update() so filters are applied.
+            // therefore we have to record cursor position (selection)
+            // so that after vm.$set changes the input
+            // value we can put the cursor back at where it is
+            this._savedSelection = utils.selectionHelper.saveSelection(el);
+
+            self._set();
+        }
+
+        el.addEventListener('input', self.onInput);
         el.addEventListener('textinput', self.onInput); // IE 9 support
         el.attachEvent('onpropertchange', self.onInput);
+
+        // FIXME: We don't support IE 9 so I never solved whatever issues exist with backspace / del / cut
+    },
+
+    _set: function () {
+        this.vm.$set(this.key, this.el[attrToChange])
+    },
+
+    update: function (value, init) {
+        // sync back inline value if initial data is undefined
+        if (init && value === undefined) {
+            return this._set()
+        }
+
+        this.el[attrToChange] =  typeof value !== 'string' ? '' : value
+
+        // Since updates are async, we need to reset the position of the cursor after it fires
+        // v-model tries to do this with setTimeout(cb, 0) but if there's a filter and you type
+        // too fast, there's a race condition where the timeout can fire before
+        // update, moving the cursor back to the front. Having this here guarantees the cursor
+        // is reset after update.
+        // See the comment in self.set for additional context
+        if (this._savedSelection) {
+            utils.selectionHelper.restoreSelection(this.el, this._savedSelection)
+        }
+    },
+
+    unbind: function () {
+        var el = this.el
+        el.removeEventListener('input', this.onInput)
+        el.removeEventListener('keyup', this.onEsc)
+        el.removeEventListener('keydown', this.onEnter)
+        el.removeEventListener('focus', this.onFocus)
+    }
+}
        },
        methods: {
            // Handle form submit
            onSubmit() {
                if (this.text !== "") {
                    // Dispatch event to parent components
                    this.$dispatch("new-comment", {
                        text: this.text
                    });
                    
                    // Reset Form
                    this.text = "";
                }
            },
            // Handle when a file is attached
            onFileAttach(){
            
            }
        }
    };
</script>

<style>
    
</style>
