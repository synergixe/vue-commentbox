'use strict'

import { mount, shallowMount } from '@vue/test-utils'
import { CommentBox } from '../src/index'
// import CommentBox from '../src/components/CommentBox.vue'

let wrapper = null

afterEach(() => {
    if(wrapper !== null)
        wrapper.destroy()
})

describe('CommentBox.vue', function(){

    it('make sure it is a Vue instance', function(){
        wrapper = shallowMount(CommentBox, {
            propsData: {
              comments: [{avatar_thumbnail:"https://localhost:4444/pics/user/avatar_1.png", author: "Mike Edun", text: "This is a comment!"}],
              useXhr:true,
              contextAuthor:'Mike Edun',
              contextAvatarThumb:'https://localhost:4444/pics/user/avatar_1.png',
              inputPlaceholderText:'Type Something...',
              iconFillColor:'#eeddac',
              boxAction:'http://locahost:4444/comments/send'
            }
          })

        expect(wrapper.isVueInstance).toBeTruthy()
    })
    
    it('Checking <h6> tag text', function(){
        
        wrapper = shallowMount(CommentBox, {
            propsData: {
              comments: [{avatar_thumbnail:"https://localhost:4444/pics/user/avatar_1.png", author: "Mike Edun", text: "This is a comment!"}],
              useXhr:true,
              contextAuthor:'Mike Edun',
              contextAvatarThumb:'https://localhost:4444/pics/user/avatar_1.png',
              inputPlaceholderText:'Type Something...',
              iconFillColor:'#eeddac',
              boxAction:'http://locahost:4444/comments/send'
            }
          })

        const h6 = wrapper.find('h6')

        expect(h6.text()).toBe('Replies')
    
    })

    it('clicking send button, process', function(){

        HTMLCanvasElement.prototype.getContext = function(type) {

            return {
                contextName:type,
                fillText:function(){

                },
                getImageData:function(){

                    return {
                        data:[225, 123, 52]
                    }
                }
            }
        }

        wrapper = mount(CommentBox, {
            propsData: {
              comments: [{avatar_thumbnail:"https://localhost:4444/pics/user/avatar_1.png", author: "Mike Edun", text: "This is a comment!"}],
              useXhr:true,
              contextAuthor:'Mike Edun',
              contextAvatarThumb:'https://localhost:4444/pics/user/avatar_1.png',
              inputPlaceholderText:'Type Something...',
              iconFillColor:'#eeddac',
              boxAction:'http://locahost:4444/comments/send'
            }
          })

        const btn = wrapper.find('#send')

        const mockEvent = {
            preventDefault: function() {}
        };

        btn.trigger('click', mockEvent)

        // expect(mockEvent.preventDefault).toHaveBeenCalled();
        expect(wrapper.vm.currentCommentText).toBe('')
    })
})