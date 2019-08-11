import Vue from 'vue'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import App from './App'
import router from './router'
import store from './store'
import mixins from './mixins'

Vue.mixin(mixins)
Vue.use(ElementUI, axios)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$axios = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: {App},
  router,
  store,
  template: '<App/>'
}).$mount('#app')
