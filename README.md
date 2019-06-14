# vue-commentbox
[![Build Status](https://travis-ci.org/synergixe/vue-commentbox.svg?branch=master)](https://travis-ci.org/synergixe/vue-commentbox)

An elegant and stylable comment box for VueJS web applications

## Getting Started

> Download from NPM or Yarn

```bash
npm i vue-commentbox --save

yarn add vue-commentbox
```

## Browser Support

- IE9+
- Opera 10.5+
- Firefox 3.5+
- Chrome 4.0+
- Edge 13+

## Caveats

- This package provides a polyfill for **FormDtata** so the comment can be submitted with file attachments, you MUST also include [Polyfill library](https://polyfill.io) to enable the code work on older browsers like IE 9/Opera 11
- Due to some bugs related to _contenteditable_ which have not yet been fixed, IE 9-11 and Opera 10-14 work partially 

## Importing

```js

import Vue from 'vue';
import { CommentBox, CommentBoxPlugin } from "vue-commentbox";

Vue.use(CommentBoxPlugin);

```

## How to Use

```js

new Vue({
	el:"#app",
	template:`<main class="page">
		<comment-box :input-placeholder-text="placeHolderText" :comments="comments" :context-author="'Dauda Adeboye'" :context-avatar-thumb="thumbImage" :box-action="actionHref" use-xhr="xhr" v-on:beforesend="beforeSend">
   		
   		</comment-box>
	</main>`,
	components:{ 'comment-box':CommentBox },
	data:function(){

		return {
			comments:[],
			placeHolderText:'Post Something',
			xhr:true,
			iconFillColor:'#eeddac'
		}
	},
	methods:{
      beforeSend:function(){
        console.log("about to send comment to server...")
      }
    },
	computed:{
		actionHref:function(){
		
			let origin = window.location.origin;
		
			return `${origin}/store/comment`;
		},
		thumbImage:function(){
		
			let scheme = window.location.protocol;
			
			return `${scheme}//assets-cdn.store.com.ng/images/png/passport.jpg`
		
		},
		usernamesAvailable:function(){
		
			return true;
		}
	}
});

```

## Modify CSS

```css
	.comment-body-wrapper {
		padding:20px; /* make the comment box smaller in size - customization */
	}
```

## License

MIT

## Contributing