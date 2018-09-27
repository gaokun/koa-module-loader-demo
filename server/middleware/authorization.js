
module.exports.check = async (ctx, next) => {
  // TODO: 可以配合jsonwebtoken或oauth做验证
  console.log('authorization.check');
  await next();
};

