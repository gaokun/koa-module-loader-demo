module.exports = async (ctx, next) => {
  console.log('middleware2 enter');
  await next();
  console.log('middleware2 leave');
};
