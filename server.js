const express = require('express')
const proxy = require('http-proxy-middleware')
const app = express()

const fbAuthService = {
  target: 'https://bifrost-auth-service.herokuapp.com',
  changeOrigin: true,
  secure: false
}

// Path replace sample
// const fbAuthService = {
//   target: 'http://bifrost-auth-service.herokuapp.com',
//   changeOrigin: true,
//   pathRewrite: {'^/api/auth' : '/auth/facebook'},
// }

// nyTimesService.onProxyReq = (proxyReq, req, res) => (
//   proxyReq.setHeader('api-key', 'ae3fedf5ff7f4b5ca957a84f75c7b76c')
// )

const fbAuthProxy = proxy(fbAuthService)

app.get('/auth/facebook', fbAuthProxy)

let port = process.env.PORT || 3000

app.listen(port, () => console.log('Servidor proxy Iniciado na porta ' + port))
