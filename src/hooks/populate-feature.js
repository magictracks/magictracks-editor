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
    

    console.log("I'm the result", context.result);

    let result;

    // if FIND is called, assign the result to the data array []
    // if GET is called, assign it directly to result
    if (requestType === "FIND"){

      if(context.path == "projects"){
        result = await Model.find(params.query)
        .populate({
          path: 'branches.recipes.recipe',
          model: 'recipes',
          populate:{
            path: 'branches.links.link',
            model: 'links'
          }
        })
        .exec();
      } else if (context.path == "recipes"){
  
        result = await Model.find(params.query)
        .populate({
          path: 'branches.links.link',
          model: 'links'})
        .exec();
      }

      context.result.data = result;
    } else if (requestType === "GET"){

      if(context.path == "projects"){
        result = await Model.findOne(context.result._id)
        .populate({
          path: 'branches.recipes.recipe',
          model: 'recipes',
          populate:{
            path: 'branches.links.link',
            model: 'links'
          }
        })
        .exec();
      } else if (context.path == "recipes"){
  
        result = await Model.findOne(context.result._id)
        .populate({
          path: 'branches.links.link',
          model: 'links'})
        .exec();
      }
      // console.log("I'm the result 🌈🌈🌈🌈",result);
      context.result = result
    }
    

    return context;
  };
};
