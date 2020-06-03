module.exports = option => {
  return async (req, res, next) => {
    const modelName = require('inflection').classify(req.params.resource) // req.params.resource为命名路由:resource的参数, inflection将父路由传过来的参数如categories转化为类名的形式Category
    req.Model = require(`../models/${modelName}`)
    next()
  }
}