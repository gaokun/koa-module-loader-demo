# koa-module-loader-demo
  ![npm (scoped)](https://img.shields.io/npm/v/@cycle/core.svg)
  ![npm](https://img.shields.io/npm/l/express.svg)
  
a demo for 'koa-module-loader' plugin

> Easy to add & use middleware/module
> 
> Feel cool to add api with middlewares 

## How to run
> git clone https://github.com/gaokun/koa-module-loader-demo.git<br>
> npm install<br>
> npm start

### then you can test API and see log in console:
> [http://localhost:3000/api/test1](http://localhost:3000/api/test1)

```
middleware1 enter
test controller action
middleware1 leave
```

> [http://localhost:3000/api/test2](http://localhost:3000/api/test2)

```
middleware1 enter
middleware2 enter
test controller action
middleware2 leave
middleware1 leave
```

> [http://localhost:3000/api/test3](http://localhost:3000/api/test3)

```
authorization.check
middleware1 enter
test controller action
middleware1 leave
```

## Demo File Structure
```javascript
server
    ├── middleware   // middleware folder [name locked]
    │   ├── authorization.js
    │   ├── error_handler.js
    │   ├── middleware1.js
    │   ├── middleware2.js
    │   └── x_response_time.js
    ├── module       // module folder [name locked]
    │   └── api
    │       └── test
    │           ├── test.conf.json
    │           └── test.controller.js
    └── server.js    // entry file to start server
```

## How to add new middleware
put it in `middleware` folder

*folder name = middleware name*<br>
so `"GET /test1 middleware1|test"`

## How to add new module
new module folder in `module/api`, like `test`

add `{moduleName}.conf.json` and `{moduleName}.controller.js` into it. 

### Like:

**test.conf.json**

```json
{
  "route": [
    "GET /test1 middleware1|test",
    "GET /test2 middleware1|middleware2|test",
    "GET /test3 authorization.check|middleware1|test"
  ]
}
```

**test.controller.js**

```javascript
async function test(ctx, next) {
  console.log('test controller action');
  ctx.body = 'ok';
}

module.exports = {
  test
};

```

## How to add an API

add it in `test.conf.json`.

like `"GET /test1 middleware1|test"`

#### Format:
`"{Method} {url} {action function}"`

`"{Method} {url} {middleware}|{action function}"`

`"{Method} {url} {middleware1}|{middleware2}|{action function}"`

As you see, `middleware is optional`, and sure, you can define a `middleware chain` for an API.

*koa-module-loader will find `action function` in its controller.js*

#### Example:

API: 'new topic' (push attachment at the same time)

`"POST /user/topic authorization.check|upload|addTopic"`

execute process:

* authorization.check (can't new topic if not login)
* upload (save file, and put resource_id in context)
* addTopic (add row in database, with resource_id)

#### Koa Global Error Handler
new `error_handler.js` middleware folder:

```javscript
module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (e) {
  	 // Do whatever you want to do here
    console.error('Error Handler', e);
    ctx.body = e;
  }
};
```

set `error_handler` in koa before loading moudles:


```javascript
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('koa-router')({ prefix: '/api' });
const { middleware_loader, module_loader } = require('koa-module-loader');

const app = new Koa();
app.use(bodyParser());

middleware_loader().then((middlewares) => {
  router.use(middlewares.error_handler);       // HERE
  router.use(middlewares.x_response_time);

  module_loader(middlewares, router);
});

app.use(router.routes());

app.listen(3000);
```


## Contact Me:

Email: kytogether@vip.qq.com

## License
Released under the [MIT License](http://www.opensource.org/licenses/mit-license.php).

[npm-image]: https://img.shields.io/npm/v/@cycle/core.svg
[npm-url]: https://www.npmjs.com/package/lazy-worker
