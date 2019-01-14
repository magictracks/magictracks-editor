// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {

      /**
    { '$push':
      { branches:
        { branchName: 'my branch 1',
        description: 'my super exciting awesome time in NYC' } } }
    */

      console.log("params 🦄🦄🦄🦄", context.params)
      console.log("data 🦄🦄🦄🦄", context.data)
      // only execute the following if we're pushing a new branch
      if (context.data.hasOwnProperty("$push") && context.data.$push.hasOwnProperty("branches")) {

        const {
          params
        } = context;
        const {
          Model
        } = context.app.service(context.path);
        let result;

        if (context.path == "recipe") {
          result = await Model.findOne(params.query).populate({
            path: 'branches.steps.step',
            model: 'step',
            populate: {
              path: 'branches.ingredients.ingredient',
              model: 'ingredient'
            }
          }).exec();
        } else if (context.path == "step") {
          result = await Model.findOne(params.query).populate({
            path: 'branches.ingredients.ingredient',
            model: 'ingredient',
          }).exec();
        } else if (context.path == "ingredient") {
          result = await Model.findOne(params.query)
        }

        if (params.user.username) {
          // if the current user is the owner or a collaborator
          if (result.owner == params.user.username || result.collaborators.includes(params.user.username)) {
            context.data.$push.branches.branchOwner = params.user.username;
          } else {
            console.log("TODO: you're not the owner, but you can make a new copy")
            throw new Error("you're not the owner or a collaborator, but you can make a copy if you'd like!")
          }
        } else {
          console.log("no params.user.username")
        }

        return context;
      } else {
        console.log("Not creating a new branch, skipping")
        return context;
      }
   
  };
};
