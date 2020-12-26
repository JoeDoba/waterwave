const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  if (process.env.NODE_ENV === 'production') {
    return;
  }

  app.use(
    ["/api/*", "/auth/google", "/auth/github"],
    createProxyMiddleware({
      target: "http://localhost:5000",
    })
  );
};