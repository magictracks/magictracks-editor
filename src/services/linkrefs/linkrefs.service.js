// Initializes the `linkrefs` service on path `/linkrefs`
const createService = require('feathers-mongoose');
const createModel = require('../../models/linkrefs.model');
const hooks = require('./linkrefs.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/linkrefs', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('linkrefs');

  service.hooks(hooks);
};
