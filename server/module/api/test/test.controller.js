
async function test(ctx, next) {
  console.log('test controller action');
  ctx.body = 'ok';
}


module.exports = {
  test
};
