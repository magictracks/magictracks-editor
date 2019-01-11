// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const generate = require('project-name-generator');

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {

    // const {Model} = context.app.service(context.path);
    console.log("add unique name to default branch 😍")

    context.data.uniqueName = generate({ words: 2, alliterative: true }).dashed
    
    return context;
  };
};
