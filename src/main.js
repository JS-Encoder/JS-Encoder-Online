import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import '@assets/css/code-font.css'

// 插件
import Alert from './plugins/alert'
import { codemirror } from 'vue-codemirror'
Vue.use(Alert).use(codemirror)

Vue.config.productionTip = false

// 请求方法
import api from '@service/api'
Vue.prototype.$http = api

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
