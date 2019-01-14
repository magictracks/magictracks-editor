// Initializes the `playlists` service on path `/playlists`
const createService = require('feathers-mongoose');
const createModel = require('../../models/step.model');
const hooks = require('./step.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/step', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('step');

  service.hooks(hooks);
};
