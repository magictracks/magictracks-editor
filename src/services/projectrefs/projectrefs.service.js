// Initializes the `projectrefs` service on path `/projectrefs`
const createService = require('feathers-mongoose');
const createModel = require('../../models/projectrefs.model');
const hooks = require('./projectrefs.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/projectrefs', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('projectrefs');

  service.hooks(hooks);
};
