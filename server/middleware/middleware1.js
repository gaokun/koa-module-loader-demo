module.exports = async (ctx, next) => {
  console.log('middleware1 enter');
  await next();
  console.log('middleware1 leave');
};
