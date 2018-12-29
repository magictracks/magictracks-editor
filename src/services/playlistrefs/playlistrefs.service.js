// Initializes the `playlistrefs` service on path `/playlistrefs`
const createService = require('feathers-mongoose');
const createModel = require('../../models/playlistrefs.model');
const hooks = require('./playlistrefs.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/playlistrefs', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('playlistrefs');

  service.hooks(hooks);
};
