# vue-commentbox

An elegant and stylable comment box for VueJS web applications

## Browser Support

- IE9+
- Opera 10.5+
- Firefox 12.0+
- Chrome 4.0+
- Edge 13+

## Caveats

- This package provides a polyfill for **FormDtata** so the comment can be submitted with file attachments, you MUST also include [Polyfill library](https://polyfill.io) to enable the code work on older browsers like IE 9/Opera 11
- Due to some bugs related to _contenteditable_ which have not yet been fixed, IE 9-11 and Opera 10-14 work partially 

## How to Use

```html

   <comment-box :input-placeholder-text="'Post Something'" :context-author="'Dauda Adeboye'" :context-avatar-thumb="'http://assets.image-base.com/png/passport.jpg'" :box-action="'https://app.example.com/store/comment'" use-xhr="'true'" v-on:beforesend="beforeSend">
   		<div slot="autocomplete">
			<ul>
				
			</ul>
		</div>
   		<div slot="link"></div>
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
