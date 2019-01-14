// Initializes the `links` service on path `/links`
const createService = require('feathers-mongoose');
const createModel = require('../../models/ingredient.model');
const hooks = require('./ingredient.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/ingredient', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('ingredient');

  service.hooks(hooks);
};
