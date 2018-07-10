# vue-commentbox

An elegant and stylable comment box for VueJS web applications

## Browser Support

- IE9+
- Opera 10.5+
- Firefox 3.5+
- Chrome 4.0+
- Edge 13+

## Caveats

- This package provides a polyfill for **FormDtata** so the comment can be submitted with file attachments, you MUST also include [Polyfill library](https://polyfill.io) to enable the code work on older browsers like IE 9/Opera 11
- Due to some bugs related to _contenteditable_ which have not yet been fixed, IE 9-11 and Opera 10-14 work partially 

## How to Use

```js

// js/main.js File

import { CommentBox } from "vue-commentbox"

new Vue({
	el:"#app",
	components:{ CommentBox },
	data:{
	     placeHolderText:'Post Something',
	     xhr:true,
	     befroeSend:function(){
	     
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
		
		}
	}
});

```

```html

   <script type="text/javascript" src="./js/main.js"></script>

   <comment-box :input-placeholder-text="placeHolderText" :context-author="'Dauda Adeboye'" :context-avatar-thumb="thumbImage" :box-action="actionHref" use-xhr="xhr" v-on:beforesend="beforeSend">
   		<div slot="autocomplete">
			<ul>
				<li></li>
			</ul>
		</div>
   </comment-box>
```

## Modify CSS

```css
	.comment-body-wrapper {
		padding:20px; /* make the comment box smaller in size - customization */
	}
```

## License

MIT
