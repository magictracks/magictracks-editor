const users = require('./users/users.service.js');
const playlists = require('./playlists/playlists.service.js');
const links = require('./links/links.service.js');
const projects = require('./projects/projects.service.js');
const linkrefs = require('./linkrefs/linkrefs.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(playlists);
  app.configure(links);
  app.configure(projects);
  app.configure(linkrefs);
};
