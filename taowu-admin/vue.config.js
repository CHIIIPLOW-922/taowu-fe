const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath:'./',
  devServer:{
    port:9000,
    open: true,
      proxy: {
        '/api': {
          target: 'http://localhost:8000', // 本地后端地址
          //target: 'http://106.15.179.105:3000/', // 线上后端地址
          changeOrigin: true, //允许跨域
          pathRewrite: {
            '^/api': ''
          }
        }
      }
  },

})
