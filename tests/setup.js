//setup.js
require('jsdom-global')(undefined, { pretendToBeVisual: true, url: 'http://localhost' })

global.expect = require('expect')

// https://github.com/vuejs/vue-cli/issues/2128
window.Date = Date