// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {

    const {Model} = context.app.service(context.path);
    
    const originId = {"origin": context.result._id}
    const result = await context.app.service(context.path).patch(context.result._id, originId, null);

    context.result = result;

    return context;
  };
};
