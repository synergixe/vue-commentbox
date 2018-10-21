/*!
 * @copyright: Copyright (c) 2018 Oparand Ltd - Synergixe
 *
 * @author: https://twitter.com/isocroft
 * @version:
 * @desc:
 * @created: 
 */

import installFormDataPolyfill from "@/polyfills/FormData";

var Ajax = {
	/**
	 *
	 *
     *
	 *
	 *
	 */
	sendHttpRequest(requestBodyObject, useXHR){

        if(!requestBodyObject){

            return null;
        }

        let isHTMLForm = requestBodyObject.nodeType === 1 && requestBodyObject.nodeName === 'FORM';
        
        if(!isHTMLForm) {

            return null;
        }

        installPromisePolyfill();

        return new Promise(() => {

            let httpTransport = this._xhrObject(requestBodyObject, useXHR);

            httpTransport.addListener('load', function(){
                resolve(xhr.asBlob ? responseBlob : xhr.responseText);
            });

            httpTransport.send((useXHR? new FormData(requestBodyObject) : null));

        });
	},
    /**
     *
     *
     *
     *
     *
     */
	_xhrObject(entityBodyObject, useXHR){

        var xhr;

            if(!useXHR){

                xhr = {};

                xhr._sink = window.frames[entityBodyObject.target];

                xhr.addListener = (type, callback) => {

                    if(type === 'load'){
                        if(typeof document.documentMode === 'number'
                                && document.documentMode <= 8){
                            this._sink.attachEvent('on'+type, callback);
                        }else{
                            this._sink.addEventListener(type, callback, false);
                        }
                    }
                }

                xhr.send = (nulls) => {

                    entityBodyObject.submit();
                }

            }else{

                installFormDataPolyfill({

                });

                if(window.XDomainRequest){

                    XDomainRequest.prototype.addListener = (type, callback) => {
                        
                        this['on'+type] = callback;
                    }

                    xhr = new XDomainRequest();
                }else if(window.XMLHttpRequest){

                    XMLHttpRequest.prototype.addListener = (type, callback) => {

                        this[type] = callback;
                    }

                    xhr = new XMLHttpRequest();
                }

                xhr.open('POST', url, true);

                xhr.withCredentials = true;
            }

        return xhr;
    }
};

export default Ajax;
