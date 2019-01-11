// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    context.data.selectedColor = Math.round(Math.random() * 5) // on create, choose a random number 
    return context;
  };
};
