const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer:{
    proxy:{
      "/gen":{
        target: 'http://localhost:8080',
        changeOrigin: true,
        //pathRewrite: { '^/api': '' }
      },
      "/check":{
        target: 'http://localhost:8080',
        changeOrigin: true,
        //pathRewrite: { '^/api': '' }
      },
      "/login":{
        target: 'http://localhost:8080',
        changeOrigin: true,
        pathRewrite: { '^/login': '/api/login' }
      },
      "/protected": {
        target: 'http://localhost:8080',
        changeOrigin: true,
        pathRewrite: { '^/protected': '/api/protected' }
      }
    }
  }
})