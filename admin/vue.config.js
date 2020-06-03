module.exports = {
  devServer: {
    open: true,
    host: '0.0.0.0',
    port: 3011,
    https: false,
    hotOnly: false
    // proxy: { // 配置跨域
    //   '/api': {
    //     target:'http://xxx.xx.xxx.xxx:8080', // 源地址
    //     changeOrigin: true, // 改变源
    //     ws: true, // 是否代理websockets
    //     pathRewrite: {
    //       '^/api': ''
    //     }
    //   }
    // }, // 配置跨域处理,只有一个代理
    // before: app => { }
  },
  // 第三方插件配置
  pluginOptions: {}
}
