// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    console.log("the user is 😍: ", context.params.user)

    
    context.data.owner = context.params.user.username;

    return context;
  };
};
