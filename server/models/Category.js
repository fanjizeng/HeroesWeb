const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String},
  parent: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }
})
// schema.virtual('children', { //虚拟表，不会存到真正的数据库中，表中的值都是从真正的数据库中拼接而成
//   localField: '_id',
//   foreignField: 'parent',
//   justOne: false,
//   ref: 'Category'
// })
module.exports = mongoose.model('Category', schema, 'categories')