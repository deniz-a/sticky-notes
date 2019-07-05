import Vue from 'https://cdn.jsdelivr.net/npm/vue/dist/vue.esm.browser.js'

import App from '/components/App.js'

new Vue({
  render: h => h(App),
}).$mount(`#app`)
