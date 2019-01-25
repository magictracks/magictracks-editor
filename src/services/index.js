const users = require('./users/users.service.js');
const links = require('./links/links.service.js');
const recipes = require('./recipes/recipes.service.js');
const projects = require('./projects/projects.service.js');


// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(links);
  app.configure(recipes);
  app.configure(projects);
};
