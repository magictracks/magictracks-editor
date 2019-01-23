// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
      const{params} = context;
      const {Model} = context.app.service(context.path)
      // if the user is the Owner or a collaborator allow write, 
      // otherwise throw an error thats suggests the user to:
      // a: copy -- for projects and playlists
      // b: add branch (?)
      console.log("✅✅✅✅✅✅✅")
      console.log(context)
      const user = context.params.user;
      console.log("✅✅✅✅✅✅✅")

      const feature = await Model.findOne(params.query);

      if(user.username == feature.owner || feature.collaborators.includes(user.username) ){
        console.log("you're allowed to make edits!")
        return context;
      } else {
        console.log("you're NOT allowed to make edits!")
        throw new Error("You're not allowed to make edits, copy or make a branch");
      }

  };
};
