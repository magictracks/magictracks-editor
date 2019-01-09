const {
  authenticate
} = require('@feathersjs/authentication').hooks;
const addOwner = require('../../hooks/add-owner.js');

const populateLinks = function (requestType) {
  return async (context) => {
    const {
      params
    } = context;

    const {
      Model
    } = context.app.service(context.path);

    const result = await Model.find(params.query)
      .populate({
        path: 'branches.links.link',
        model: 'links'})
      .exec();

    // if FIND is called, assign the result to the data array []
    // if GET is called, assign it directly to result
    if (requestType === "FIND"){
      context.result = Object.assign({'data': []}, context.result)
      context.result.data = result;
    } else if (requestType === "GET"){
      context.result = result
    }
    
    return context;
  }
}

module.exports = {
  before: {
    all: [],
    find: [populateLinks('FIND')],
    get: [populateLinks('GET')],
    create: [authenticate('jwt'), addOwner()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
