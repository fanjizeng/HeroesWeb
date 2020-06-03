module.exports = app => {
  const express = require('express')
  require('express-async-errors') // express5以下无法使用异步错误表达，需要此模块
  const AdminUser = require('../../models/AdminUser')
  const jwt = require('jsonwebtoken')
  const assert = require('http-assert')
  const router = express.Router({
    mergeParams: true // 保留来自父路由器的req.params值。如果父对象和子对象具有冲突的参数名，则以子对象的值为准。
  })

  // // 登录验证中间件
  const authMiddleware = require('../../middleware/auth')
  // 创建资源路径中间件
  const resourceMiddleware = require('../../middleware/resource')
  // 创建资源
  router.post('/', async(req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })
  // 修改资源
  router.put('/:id', async(req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })
  // 请求编辑页面
  router.get('/:id',
   async(req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })
  // 请求新建页面
  router.get('/', async(req, res) => {
    const queryOptions = {}
    if(req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent'
    }
    const items = await req.Model.find().setOptions(queryOptions).limit(300)
    res.send(items)
  })
  // 删除资源
  router.delete('/:id', async(req, res) => {
    await req.Model.findByIdAndDelete(req.params.id, req.body)
    res.send({
      success: true
    })
  })
  app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), router)
  // 上传头像
  const multer = require('multer') // 引用上传模块
  const upload = multer({dest: __dirname + '/../../uploads'}) //指定上传文件地址
  app.post('/admin/api/upload', upload.single('file'), async (req, res) => {
    const file = req.file
    file.url = `http://localhost:3010/uploads/${file.filename}`
    res.send(file)
  })
  // 登录路由
  app.post('/admin/api/login', async (req, res) => {
    const { username, password } = req.body
    // 1.根据用户名找用户
    const user = await AdminUser.findOne({username}).select('+password')
    assert(user, 422, '用户不存在')
    // 2.校验密码
    const isValid = require('bcryptjs').compareSync(password, user.password)
    assert(isValid, 422, '密码错误')
    // 3.返回token
    const token = jwt.sign({id: user._id}, app.get('secret'))
    res.send({token})
  })
  // 错误处理函数，加入express-async-errors后才能使用assert模块
  app.use(async (err, req, res, next) =>{
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })
}