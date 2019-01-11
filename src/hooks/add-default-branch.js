// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {

    console.log("adding default branch 😍")

    let defaultBranch = {
      "branches":[{
        "branchName":"default",
        "branchOwner": context.params.user.username,
        "description":"default"
      }]
    }

    context.data = Object.assign(defaultBranch, context.data);
    console.log(context.data)

    // TODO: add AFTER hook to add in the branchName of the generated Unique name

    return context;
  };
};

// const createDefaultBranch = function (options = {}) {
//   return async context => {
   
//     console.log(context.result.uniqueName);
//     console.log(context.result.description);
//     const defaultVals = {"$push": {
//       "branches": {
//         "branchName": context.result.uniqueName,
//         "description": context.result.description
//       }
//     }};

//     const result = await context.app.service(context.path).patch({"_id": context.result._id}, defaultVals, null);
    
//     console.log("🔥",result);
//     // context.result = result;
    
//     return context;
//   };
// }
