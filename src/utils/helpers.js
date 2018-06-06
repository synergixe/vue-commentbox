
var Helpers = {
	/**
	 *
	 *
	 * @param HTMLElement | Element - start
	 * @param HTMLElement | Element - end
	 * @returns HTMLElement | Element | Undefined - parent
	 *
	 */
	getCommonAncestor(start, end){

		var queue = [], parent = end;

		do{

			queue.shift(start);

			while(queue[0]){

				if(queue[0] === parent){
					return parent;
				}

				queue.shift(queue[0].parentNode);
			}

			queue.length = 0;

			queue.push(parent.parentNode);

			parent = queue.unshift();

		}while(parent);
	},
	/**
	 *
	 *
	 *
	 * @param HTMLElement | Element - start
	 * @param HTMLElement | Element - end
	 * @param HTMLElement | Element | Undefined - commonAncestor
	 * @returns Array
	 *
	 */
	getElementsBetweenTree(start, end, commonAncestor) {
    
		   var ancestor = (commonAncestor || this.getCommonAncestor(start, end)), 
    			before = [], after= [];

		    while (start.parentNode !== ancestor){

			var el = start;

			while (el.nextSibling)
			    before.push(el = el.nextSibling);
			start = start.parentNode;
		    }

		    while (end.parentNode !== ancestor){

			var el = end;

			while (el.previousSibling)
			    after.push(el= el.previousSibling);
			end = end.parentNode;
		    }

		    after.reverse();

		    while ((start= start.nextSibling)!==end)
			before.push(start);

		    return before.concat(after);
	},
	/**
	 *
	 *
	 * @param String - html
	 * @returns DocumentFragment - fragment :
	 *
	 */
	createAsFragment(html){

		var fragment;

		if(html){
			fragment = this.convertHTMLToDOM(html);
		}

		return fragment;
	},
	/**
	 *
	 *
	 *
	 * @param void
	 * @returns String - html :
	 *
	 */
	textRangeToHTML(){

	 	var range = this.getCurrentTextRange(), 
	 		nodes = this.getElementsBetweenTree(
	 							range.startContainer, 
	 							range.endContainer, 
	 							range.commonAncestorContainer
					),
			html = this.convertDOMToHTML(nodes);

			return html;
	},
	/**
	 *
	 *
	 *
	 * @param HTMLElement | Element - watcher :
	 * @param Object : [ position; Number, length; Number ]
	 * @returns Undefined
	 *
	 */
	selectAllTextByOffset(watcher, {position, length}){

		var node = this.convertHTMLToDOM(watcher.innerHTML),
			selectionOffsetAnchors = [
								this.convertHTMLToDOM(
									'<a id="__selectionOffset_Start"></a>'
								).lastChild,
								this.convertHTMLToDOM(
									'<a id="__selectionOffset_End"></a>'
								).lastChild
			],
			movingOffset = -1,
			frag = this.createAsFragment(null),
			cursorStart = null,
			cursorEnd = null;

			watcher.innerHTML = this.convertDOMToHTML(
									this.setAnchorsAtOffsetOnFragment(
										node, 
										movingOffset, 
										frag, 
										selectionOffsetAnchors
									)
								);

			cursorStart = document.getElementById("__selectionOffset_Start");
			cursorEnd = document.getElementById("__selectionOffset_End");

			
			if (watcher.className.match(/\scurrently-selecting(\s|$)/)) {
                
                if (cursorStart) {
                    cursorStart.parentNode.removeChild(cursorStart);
                }

                if (cursorEnd) {
                    cursorEnd.parentNode.removeChild(cursorEnd);
                }

            } else if (cursorStart) {

            	if(window.getSelection){

		                range = document.createRange();

		                if (cursorEnd) {

		                    range.setStartAfter(cursorStart);
		                    range.setEndBefore(cursorEnd);

		                    // Delete cursor markers
		                    cursorStart.parentNode.removeChild(cursorStart);
		                    cursorEnd.parentNode.removeChild(cursorEnd);

		                    // Select range
		                    selection.removeAllRanges();
		                    selection.addRange(range);
		                } else {
		                    range.selectNode(cursorStart);

		                    // Select range
		                    selection.removeAllRanges();
		                    selection.addRange(range);

		                    // Delete cursor marker
		                    document.execCommand('delete', false, null);
		                }

                }else if(document.selection){

                		range = document.body.createTextRange();
                }
            }
	},
	/**
	 *
	 *
	 *
	 * @param HTMLElement | Element - node :
	 * @param Number - movingOffset
	 * @param DocumentFragment - frag
	 * @param Array - selectionOffsetAnchors
	 * @returns DocumentFragment - frag
	 *
	 */
	setAnchorsAtOffsetOnFragment(node, movingOffset, frag, selectionOffsetAnchors){

		var child = null, 
			children = ([]).slice.call(node.childNodes), 
			text = '',
			_child = null,
			_next = null,
			_delta = null;

		while(children.length != 0) {
			
			child = children.shift();

			if(child){ 
				
				if(child.nodeType === 1){

					delta = position - movingOffset;
					step = (position + length - 1) - movingOffset;
					
					if(delta <= 0){ 

						if(!frag.lastChild
							|| frag.lastChild.nodeType === 1){

							if(delta === 0){
								frag.appendChild(selectionOffsetAnchors.shift());
							}else{
								 _child = frag.lastChild;
								 _delta = Math.abs(delta);

								 if(_child){
									 do{
									 	_child = _child.previousSibling;
									 	if(_child 
									 		&& _child.nodeType === 1){
									 		--_delta;
									 		if(_delta === 0){
									 			frag.insertBefore(selectionOffsetAnchors.shift(), _child);
									 		}
										}else if(_child
													&& _child.nodeType === 3){
											if(_child.data.length >= _delta){
												if(_child.data.length === _delta){
													frag.insertBefore(selectionOffsetAnchors.shift(), _child);
												}else{
													_next = _child.nextSibling;
													_child = frag.replaceNode(document.createTextNode(_child.data.substring(0, _child.data.length - _delta - 1)), _child);
													frag.insertBefore(selectionOffsetAnchors.shift(), _next);
													frag.insertBefore(document.createTextNode(_child.data.substring(_child.data.length - _delta)), _next);
												}
												_delta = 0;
											}else{
												_delta -= _child.data.length;
											}
										}
									 }while(_child && _delta != 0);

								}else{
									throw "Miscalculation - Fragment cannot be empty!!";
								}
							}
						}else{
							if(!frag.lastChild
								|| frag.lastChild.nodeType === 3){
								if(delta === 0){
									frag.appendChild(selectionOffsetAnchors.shift());
								}else{
									;
								}
							}else if(frag.lastChild
										&& frag.lastChild.nodeType === 3){
								if(delta === 0){
									frag.appendChild(selectionOffsetAnchors.shift());
								}else{
									if(frag.lastChild.data.length > Math.abs(delta)){
										_child = frag.replaceNode(document.createTextNode(_child.data.substring(0, _child.data.length + _delta - 1)), _child);
										frag.insertBefore(selectionOffsetAnchors.shift(), _next);
										frag.insertBefore(document.createTextNode(_child.data.substring(_child.data.length + _delta)), _next);
									}
								}
							}
						}

						if(step - delta >= 1){
							;
						}
					}else{
						if(child.childNodes.length === 0){
								frag.appendChild(child.cloneNode(false));
								movingOffset += 1;
						}else if((child.childNodes.length === 1 && child.childNodes[0].nodeType === 1)){
								frag.appendChild(child.cloneNode(true));
								movingOffset += 1;
						}else{
							return Helpers.setAnchorsAtOffsetOnFragment(child, movingOffset, frag, selectionOffsetAnchors);
						}
					}	
					

				}else if(child.nodeType === 3){
					delta = position - movingOffset;
					if(delta > child.data.length - 1){
						movingOffset += child.data.length;
					}else if(delta >= 0){
						movingOffset += (delta === 0 ? 1 : delta);
						
						if(frag.lastChild === null){
							frag.appendChild(selectionOffsetAnchors.shift());
						}

						if(selectionOffsetAnchors.length){
							step = (position + length - 1) - movingOffset;
							if(child.data.length >= (delta + step)){

								if(delta > 0){
									frag.appendChild(document.createTextNode(child.data.substring(delta - 1, step)));
								}else{
									frag.appendChild(document.createTextNode(child.data.substring(delta, step)));
								}

								frag.appendChild(selectionOffsetAnchors.shift());
								break;
							}else{

								if(frag.lastChild
									&& frag.lastChild.nodeType === 3){
									frag.lastChild.appendData(child.data.substring((delta > 0? delta - 1 : delta)));
								}else if(frag.lastChild
											&& frag.lastChild.nodeType === 1){
									frag.appendChild(document.createTextNode(child.data.substring((delta > 0? delta - 1 : delta))));
								}
								movingOffset += (step - 1);

							}
						}
					}
				}
			}

		}

		return frag;
	},
	/**
	 *
	 *
	 * @param Array | HTMLElement | Element - dom
	 * @returns String | Null - html
	 *
	 */
	convertDOMToHTML(dom){

		var html = null, 
			len = -1,
			wrap = document.createElement('div');

		if(!dom){
			return html;
		}

		if(typeof dom.length === 'number'
				|| dom instanceof Array){
			len = dom.length;
			while(len){
				wrap.appendChild(dom[len - 1]);
				--len;
			}
			html = wrap.innerHTML;
		}

		if(dom.nodeType === 1){
			if(dom.outerHTML){
				html = dom.outerHTML;
			}else{
				wrap.appendChild(dom);
				html = wrap.innerHTML;
			}
		}else if(dom.nodeType === 11){
			wrap.appendChild(dom);
			html = wrap.innerHTML;
		}else if(dom.nodeType === 3){
			wrap.appendChild(document.createElement('pre'));
			wrap.lastChild.appendChild(dom);
			html = wrap.innerHTML;
		}

		return html;
	},
	/**
	 *
	 *
	 * @param String - html 
	 * @returns HTMLDivElement - rootNode
	 *
	 */
	convertHTMLToDOM(html){

		var wrap = document.createElement('div'), rootNode = document.createDocumentFragment(), len;
		wrap.innerHTML = html;
		children = wrap.childNodes.length;

		for(var t=0; t < children.length; t++){
			rootNode.appendChild(wrap.childNodes[t]);
		}

		return rootNode;
	},
	/**
	 *
	 *
	 * @param HTMLElement | Element - watcher :
	 * @returns void
	 *
	 */
	selectAllText(watcher){

		var range = getCurrentTextRange();

		if(range 
			&& watcher
				&& watcher.nodeType === 1){

			range.selectNodeContents(watcher);
		}
	},
	/**
	 *
	 *
	 * @param Event | Null | Undefined - event :
	 * @returns TextRange | Range | Null - range
	 *
	 */
	getCurrentTextRange(event){

		var range = null;

		if(event 
				&& typeof event.type !== 'string'
					&& (eOrigin = event.target ? event.target : event.srcElement) 
						&& eOrigin.nodeType !== 1){
			return range;
		}

		if(document.caretRangeFromPoint){
          
          	if(event 
          			&& (event.type.indexOf("mouse") > -1
          					|| event.type.indexOf("click") > -1)){

            	range = document.caretRangeFromPoint(event.clientX, event.clientY);
         	}
        }

		if(window.getSelection){

                selection = window.getSelection(); 

                if(!range){

                    if(selection.getRangeAt
                    	&& selection.rangeCount > 0){ // Opera 9+/Firefox 3.5+/Chrome 2+

                        range = selection.getRangeAt(Math.max(0, (selection.rangeCount - 1))); 
                    }

                    if(
                        !range &&
                        document.createRange &&
                        selection.anchorNode &&
                        selection.anchorOffset &&
                        selection.focusNode &&
                        selection.focusOffset // Safari 2+
                    ) {
                        range = document.createRange();
                        range.setStart(selection.anchorNode, selection.anchorOffset);
                        range.setEnd(selection.focusNode, selection.focusOffset);
                    }
                }

          }else if(document.selection){ // IE 7+

                selection = document.selection;

                if(!range
                	&& selection.createRange){

                    range = selection.createRange();
                }
          }

          return range;
	},
	/**
	 *
	 *
	 * @param HTMLElement | Element | Null | Undefiend - watcher : 
	 * @returns void
	 *
	 */
	setCursorToSelectionAnchorNodeEnd(watcher){

		var span, 
			range, 
			selection = (document.selection || window.getSelection());

		if(!watcher 
			|| watcher.nodeType !== 1){
			watcher = (selection.anchorNode.parentNode || null);
			if(!watcher){
				return;
			}
		}

		span = document.createElement('span');
		span.appendChild(document.createTextNode("\u200b"));

		watcher.appendChild(span);

		if (document.selection) {
			range = document.body.createTextRange();
        	range.moveToElementText(node);
        	range.select();
		}else if(window.getSelection){
			range = document.createRange();
        	range.selectNode(node);

        	selection.removeAllRanges();
        	selection.addRange(range);
		}

		watcher.removeChild(span);

		if(tyepof watcher.contains === 'function' 
				&& watcher.contains(span)){
				;
		}
	},
	/**
	 *
	 *
	 * @param HTMLElement | Element | String - node :
	 * @returns void
	 *
	 */
	insertNodeAtCursor(node) {
	    var sel, range, html;

	    if(tyepof node === 'string'){
	    	node = document.createTextNode(node);
	    }

	    html = (node.nodeType == 3) ? node.data : node.outerHTML;

	    if (window.getSelection) {
	        sel = window.getSelection();
	        if (sel && sel.getRangeAt && sel.rangeCount) {
	            sel.getRangeAt(0).insertNode(node);
	            return;
	        }
	    } else if (document.selection && document.selection.createRange) {
	        range = document.selection.createRange();
	        if(range.pasteHTML){
	        	range.pasteHTML(html);
	        	return;
	        }
	    }

	    if(typeof document.queryCommandSupported === 'function'
	    	&& document.queryCommandSupported('insertHTML')){
	    	document.execCommand('insertHTML', false, html);
	    }
	},
	/**
	 *
	 *
	 * @param String - html : { HTML }
	 * @return void
	 *
	 */
	insertHtmlAtCursor(html) {

	    var sel, range, node;

	    if (window.getSelection) {
	        sel = window.getSelection();
	        if (sel.getRangeAt && sel.rangeCount) {
	            range = window.getSelection().getRangeAt(0);
	            node = range.createContextualFragment(html);
	            range.insertNode(node);
	            return;
	        }
	    } else if (document.selection && document.selection.createRange) {
	        range = document.selection.createRange();
	        if(range.pasteHTML){
	        	range.pasteHTML(html);
	        	return;
	        }
	    }

	    if(typeof document.queryCommandSupported === 'function'
	    	&& document.queryCommandSupported('insertHTML')){
	    	document.execCommand('insertHTML', false, html);
	    }
	},
	/**
	 *
	 *
	 * @param Event | Object - eventObect : 
	 * @param HTMLElement | Element - watcher
	 * @return Object - choords : [ x; Number, y; Number, _caret; Number ]
	 *
	 */
	getSelectionCursorChoords(eventObject, watcher){

        var choords = {x:0 , y:0}, 
        	spanRegex = /<span class=(["'])CURSOR-POS-HACK\1>(?:[^<]*)<\/span>/i,
         	range =  getCurrentTextRange(eventObject), 
         	rect, marker, parent, caretOffset, preCaretRange;

        

	    if(window.getSelection) {
	        
		        if(!range) {
		        	return choords;
		        }
	          
	            if(!preCaretRange){
	              preCaretRange = range.cloneRange();
	            }

	            caretOffset = preCaretRange.toString().length;

	            if(preCaretRange.getClientRects().length > 0){
	              rect = preCaretRange.getClientRects()[0];
	              choords.x = rect.left;
	              choords.y = rect.top;
	            }else{
	              if(range.endOffset - 1 > 0 
	                  && range.endContainer !== watcher){
	                    preCaretRange.setStart(range.endContainer, range.endOffset - 1);
	                    preCaretRange.setEnd(range.endContainer, range.endOffset);
	                    rect = preCaretRange.getBoundingClientRect();
	                    choords.x = rect.left + rect.width;
	                    choords.y = rect.top;
	              }
	              preCaretRange.detach();
	            }
	          
	            if((choords.x === 0 && choords.y === 0)){

	              var span = document.createElement("span");
	              if(span.getClientRects) {
	                // Ensure span has dimensions and position by adding a zero-width space character
	                if(eventObject && eventObject.type.indexOf("keydown") > -1){
	                  marker = document.createTextNode(String.fromCharCode(eventObject.keyCode));
	                }else{
	                  marker = document.createTextNode("\u200b");
	                }

	                span.appendChild(marker);
	                span.className = "CURSOR-POS-HACK";
	                range.insertNode(span);

	                if(span.getClientRects().length > 0){
	                  rect = span.getClientRects()[0]; 
	                  choords.x = rect.left;
	                  choords.y = rect.top;
	                  parent = span.parentNode;
	                  parent.removeChild(span);

	                  if(typeof parent.contains == 'function'
	                      && parent.contains(span)){
	                     	_temp = watcher.innerHTML.replace(spanRegex, '');
	                      	watcher.innerHTML = _temp; // selection.anchorNode.parentNode.innerHTML
	                  }

	                  parent.normalize();
	                  span = null;
	              }
	            }
	          }     

	    }else if(document.selection){

            if(!range){
            	return choords;
            }

            if(document.selection.type != "Control"){
                
               preCaretRange = range.duplicate();
            }
              

          	caretOffset = preCaretRange.text.length;

          	if(typeof preCaretRange.getBoundingClientRect !== 'function'){
              	preCaretRange.collapse(true);
              	choords.x = range.boundingLeft;
              	choords.y = range.boundingTop;
          	}else{
              	preCaretRange.moveStart("character", -1);
              	rect = preCaretRange.getBoundingClientRect();
              	choords.x = Math.max(range.boundingLeft, rect.left);
              	choords.y = Math.max(range.boundingTop, rect.top);
          	} 
            
	    }

	    choords._caret = caretOffset;

	    return choords;
	},
	/**
     * Given an html element (with contenteditable="true"), returns the current cursor selection.
     *
     *
     * @param HTMLElelemnt | Element - containerEl :
     * @returns Object : [ start; Number, end; number ]
	 */
	saveSelection(containerEl) {
        var start;
        if (window.getSelection && document.createRange) {
            var range = window.getSelection().getRangeAt(0);
            var preSelectionRange = range.cloneRange();
            preSelectionRange.selectNodeContents(containerEl);
            preSelectionRange.setEnd(range.startContainer, range.startOffset);
            start = preSelectionRange.toString().length;

            return {
                start: start,
                end: start + range.toString().length
            }
        } else if (document.selection && document.body.createTextRange) {
            // This is for IE...
            var selectedTextRange = document.selection.createRange();
            var preSelectionTextRange = document.body.createTextRange();
            preSelectionTextRange.moveToElementText(containerEl);
            preSelectionTextRange.setEndPoint("EndToStart", selectedTextRange);
            start = preSelectionTextRange.text.length;

            return {
                start: start,
                end: start + selectedTextRange.text.length
            }
        }
    },

    /**
     * Given an html element, resets the selection to the start/end specified in savedSel. Expectation
     * is that savedSel was generated by the saveSelection function.
     *
     * @param HTMLElement | Element - containerEl :
     * @param Object -savedSel : [ start; Number, end; Number ]
     */
    restoreSelection(containerEl, savedSel) {
        if (window.getSelection && document.createRange) {
            var charIndex = 0, range = document.createRange();
            range.setStart(containerEl, 0);
            range.collapse(true);
            var nodeStack = [containerEl], node, foundStart = false, stop = false;

            // This while loop is super confusing. This part of DOM exploration is greek to me though and
            // I trust stack overflow more than trying to figure this out from first principles.
            // Here's the w3 article on nodeType http://www.w3schools.com/jsref/prop_node_nodetype.asp
            // nodeType == 3 is text. Basically it's taking the element and trying to find the text part of the element
            // Once it has that, it moves one chunk of text at a time until it finds the beginning / end
            // of the desired selection, and then creates that range.
            while (!stop && (node = nodeStack.pop())) {
                if (node.nodeType === 3) {
                    var nextCharIndex = charIndex + node.length;
                    if (!foundStart && savedSel.start >= charIndex && savedSel.start <= nextCharIndex) {
                        range.setStart(node, savedSel.start - charIndex);
                        foundStart = true;
                    }
                    if (foundStart && savedSel.end >= charIndex && savedSel.end <= nextCharIndex) {
                        range.setEnd(node, savedSel.end - charIndex);
                        stop = true;
                    }
                    charIndex = nextCharIndex;
                } else {
                    var i = node.childNodes.length;
                    while (i--) {
                        nodeStack.push(node.childNodes[i]);
                    }
                }
            }

           var sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        } else if (document.selection && document.body.createTextRange) {
            // This is for IE...
            var textRange = document.body.createTextRange();
            textRange.moveToElementText(containerEl);
            textRange.collapse(true);
            textRange.moveEnd("character", savedSel.end);
            textRange.moveStart("character", savedSel.start);
            textRange.select();
        }
    }
};

export default Helpers;
