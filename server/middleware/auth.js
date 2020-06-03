module.exports = options => {
  const jwt = require('jsonwebtoken')
  const assert = require('http-assert')
  const AdminUser = require('../models/AdminUser')
  return async(req, res, next) => {
    const token = String(req.headers.authorization || ' ').split(' ').pop() // 前端为Authorization大写，后端为authorization小写,利用空格分割成数组后，pop提取最后一个数组
    assert(token, 401, '请提供jwt token')
    const {id} = jwt.verify(token, req.app.get('secret')) // 中间件中无法访问路由中的app，所以需要加上req.app
    assert(id, 401, '无效jwt token')
    req.user = await AdminUser.findById(id)
    assert(req.user, 401, '请先登录')
    next()
  }
}