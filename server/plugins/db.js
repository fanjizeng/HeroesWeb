module.exports = app => {
  const mongoose = require("mongoose")
  mongoose.set('useCreateIndex', true) //加上这个
  mongoose.connect('mongodb://127.0.0.1:27017/HeroesWeb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  require('require-all')(__dirname + '/../models') // 当引用A模型时，A模型引用了B模型，但实际未引用B模型，则会报错，因此将所有数据模块引用一遍，防止此类问题
}