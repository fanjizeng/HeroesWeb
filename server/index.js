const express = require('express')
const app = express()

app.set('secret', 'ii34frd42GF3803cs932jx') //在全局设置一个secret密钥属性，为了加密token，一般设置在环境变量中，为了简便直接设在全局

app.use(require('cors')())
app.use(express.json())
app.use('/uploads', express.static(__dirname + '/uploads'))

require('./plugins/db')(app)
require('./routes/admin/index')(app)
require('./routes/webs/index')(app)
app.listen(3010, () => {
  console.log('http://localhost:3010')
});