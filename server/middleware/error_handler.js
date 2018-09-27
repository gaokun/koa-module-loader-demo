
module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (e) {
    console.error('Error Handler', e);

    ctx.body = e;
  }
};
