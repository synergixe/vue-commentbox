// String.fromCodePoint is super helpful
  if (!String.fromCodePoint) {
    /*!
     * ES6 Unicode Shims 0.1
     * (c) 2012 Steven Levithan <http://slevithan.com/>
     * MIT License
     **/
    String.fromCodePoint = function fromCodePoint () {
      var chars = [], point, offset, units, i;
      for (i = 0; i < arguments.length; ++i) {
        point = arguments[i];
        offset = point - 0x10000;
        units = point > 0xFFFF ? [0xD800 + (offset >> 10), 0xDC00 + (offset & 0x3FF)] : [point];
        chars.push(String.fromCharCode.apply(null, units));
      }
      return chars.join("");
    }
}

if(document.createTreeWalker){
  /*!
   *
   *
   *
   *
   */
  var IE_9_11 = (!!window.MSInputMethodContext || !!window.MStream) && (document.documentMode >= 9),
  
  var _createTreeWalker = HTMLDocument.prototype.createTreeWalker;
  
  var FF_3_11 = (false);
  
  if((IE_9_11 || FF_3_11) && document.createNodeIterator){
        document.createTreeWalker = function(rootNode, whatToShow, filter, enityRefExpansion){

              return document.createNodeIterator(rootNode, whatToShow, filter, enityRefExpansion);
        };
  }
}
