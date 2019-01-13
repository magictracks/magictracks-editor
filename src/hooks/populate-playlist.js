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
    

    // if FIND is called, assign the result to the data array []
    // if GET is called, assign it directly to result
    if (requestType === "FIND"){
      result = await Model.find(params.query)
      .populate({
        path: 'branches.links.link',
        model: 'links'})
      .exec();

      context.result = Object.assign({'data': []}, context.result)
      context.result.data = result;
    } else if (requestType === "GET"){
      result = await Model.findOne(params.query)
      .populate({
        path: 'branches.links.link',
        model: 'links'})
      .exec();

      context.result = result
    }
    
    return context;
  };
};