const express = require('express')
const proxy = require('http-proxy-middleware')
const app = express()

const blackwalletFbAuthService = {
  target: 'https://bifrost-auth-service.herokuapp.com',
  changeOrigin: true,
  pathRewrite: {'^/blackwallet/auth/facebook' : '/auth/facebook', '^/blackwallet/auth/new': '/auth/new'}
}

blackwalletFbAuthService.onProxyReq = (proxyReq, req, res) => (
  proxyReq.setHeader('application', 'blackwallet')
)

const blackwalletFbAuthProxy = proxy(blackwalletFbAuthService)

app.get('/blackwallet/auth/facebook', blackwalletFbAuthProxy)
app.get('/blackwallet/auth/new', blackwalletFbAuthProxy)

let port = process.env.PORT || 3000

app.listen(port, () => console.log('Servidor proxy Iniciado na porta ' + port))
