const restify = require('restify');
const proxy = require('http-proxy-middleware');

// Services
const blackwalletAuthService = {
  target: 'https://bifrost-auth-service.herokuapp.com',
  changeOrigin: true,
  pathRewrite: {
    '^/blackwallet/auth/facebook': '/auth/facebook',
    '^/blackwallet/auth/local': '/auth/local',
    '^/blackwallet/auth/local/new': '/auth/local/new',
  },
};

// Proxy
blackwalletFbAuthService.onProxyReq = (proxyReq, req, res) => (
  proxyReq.setHeader('application', 'blackwallet')
);

const blackwalletAuthProxy = proxy(blackwalletAuthService);

// Create and Config Server port
const PORT = process.env.PORT || 3000;
const server = restify.createServer({
  title: 'Proxy Server',
});

// Routes
server.get('/blackwallet/auth/facebook', blackwalletAuthProxy);
server.post('/blackwallet/auth/local/new', blackwalletAuthProxy);
server.post('/blackwallet/auth/local', blackwalletAuthProxy);

// Starting the Server
server.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
