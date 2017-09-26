import Vue from 'vue'
import axios from 'axios'


import App from './App'
import router from './router'
import store from './store'
import hezone from './assets/js/fun.js'
import good from './assets/js/goods.js'


if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.prototype.hezone = hezone
Vue.prototype.good = good

/* eslint-disable no-new */
var v = new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
