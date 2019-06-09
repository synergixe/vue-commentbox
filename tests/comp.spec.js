'use strict'

import { mount, shallowMount } from '@vue/test-utils'
import CommentBox from '../src/components/CommentBox.vue'

describe('CommentBox.vue', function(){
    
    it('Checking <h6> tag text', function(){
        
        const wrapper = shallowMount(CommentBox, {
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
                fillText:function(){

                },
                getImageData:function(){

                    return {
                        data:[225, 123, 52]
                    }
                }
            }
        }

        const wrapper = mount(CommentBox, {
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