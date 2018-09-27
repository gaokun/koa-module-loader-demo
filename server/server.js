const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('koa-router')({ prefix: '/api' });
const { middleware_loader, module_loader } = require('koa-module-loader');

const app = new Koa();
app.use(bodyParser());

middleware_loader().then((middlewares) => {
  router.use(middlewares.error_handler);
  router.use(middlewares.x_response_time);

  module_loader(middlewares, router);
});

app.use(router.routes());

app.listen(3000);
