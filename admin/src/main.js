import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import http from './http'
import './style.scss'
Vue.config.productionTip = false
Vue.prototype.$http = http // 加载到Vue的实例属性上去，可以在任意页面引用该实例

Vue.use(router)
Vue.use(ElementUI)
Vue.mixin({
  computed: {
    uploadUrl () {
      return this.$http.defaults.baseURL + '/upload'
    }
  },
  methods: {
    getAuthHeaders () {
      return {
        Authorization: `Bearer ${localStorage.token || ''}`
      }
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
