const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: { 
    type: String,
    select: false, //密码不可被显示，若为空，不会存储
    set(val) { // set可以修改填入到password中的内容，将保存的值设置为所需的类型
      return require('bcryptjs').hashSync(val, 10) // bcryptjs将保存的密码改为不可逆的随机码，散列位数10到12位最佳，越长散列耗时越长也越安全
    }
  }
})
module.exports = mongoose.model('AdminUser', schema)