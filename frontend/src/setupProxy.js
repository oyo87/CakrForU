const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/sdapi",
    createProxyMiddleware({
      target: "http://127.0.0.1:7860",
      changeOrigin: true,
    })
  );

  // app.use(
  //   "/seller",
  //   createProxyMiddleware({
  //     target: "http://j8a604.p.ssafy.io:8080",
  //     changeOrigin: true,
  //   })
  // );
};
