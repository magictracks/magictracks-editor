// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (requestType, options = {}) {
  return async context => {
    const {
      params
    } = context;

    const {
      Model
    } = context.app.service(context.path);

    let result;

    if(context.path == "recipe"){
      result = await Model.find(params.query)
      .populate({
        path: 'branches.steps.step',
        model: 'step',
        populate:{
          path: 'branches.ingredients.ingredient',
          model: 'ingredient'
        }
      })
      .exec();
    } else if (context.path == "step"){
      result = await Model.find(params.query)
      .populate({
        path: 'branches.ingredients.ingredient',
        model: 'ingredient'})
      .exec();
    }

    // if FIND is called, assign the result to the data array []
    // if GET is called, assign it directly to result
    if (requestType === "FIND"){
      context.result = Object.assign({'data': []}, context.result)
      context.result.data = result;
    } else if (requestType === "GET"){
      context.result = result
    }
    

    return context;
  };
};
