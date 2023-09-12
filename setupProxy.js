const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    'https://localhost:3001/https://todos.appsquare.io',
    createProxyMiddleware({
      target: 'https://todos.appsquare.io',
      changeOrigin: true,
    }),
  );
};
