import axios from 'axios'
import Vue from 'vue'
import router from './router/index'
const http = axios.create({
  baseURL: 'http://localhost:3010/admin/api'
  // 请求后台接口地址
})
// 向请求头添加token认证中间件
http.interceptors.request.use(function (config) {
  if (localStorage.token) {
    config.headers.Authorization = 'Bearer ' + localStorage.token // ‘Bearer ’ 为行业规范
  }
  return config
}, function (error) {
  return Promise.reject(error)
})
// 错误信息传递中间件
http.interceptors.response.use(res => {
  return res
}, err => {
  if (err.response.data.message) {
    Vue.prototype.$message({
      type: 'error',
      message: err.response.data.message
    })
    if (err.response.status === 401) {
      router.push('/login')
    }
  }
  return Promise.reject(err)
})

export default http
