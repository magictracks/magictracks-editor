// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {

    const {Model} = context.app.service(context.path);
    
    // const originId = {"origin": }
    let result = await Model.findById(context.result._id);

    result.origin = String(context.result._id);

    let temp = await result.save()

    console.log(temp);
    context.result = temp;

    return context;
  };
};
