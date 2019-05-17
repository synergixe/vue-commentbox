import { mount, shallow } from '@vue/test-utils'

import CommentBox from '../src/components/CommentBox.vue'

describe('CommentBox.vue',function(){
    
    it('Checking <h6> tag text', function(){
        
        const wrapper = shallow(CommentBox)

        const h6 = wrapper.find('h6')

        expect(h6.text()).toBe('Replies')
    
    })

    it('clicking send button, process', function(){

        const wrapper = mount(CommentBox)

        const btn = wrapper.find('#send')
        btn.trigger('click')

        expect(wrapper.vm.currentCommentText).toBe('')
    })
})