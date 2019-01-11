const {
  authenticate
} = require('@feathersjs/authentication').hooks;
const addOwner = require('../../hooks/add-owner.js');
const addDefaultBranch = require('../../hooks/add-default-branch.js');
const addUniqueName = require('../../hooks/add-unique-name.js');
const setRandomColor = require('../../hooks/set-random-color.js');
const checkPermissions = require('../../hooks/check-permissions.js');

const populateLinks = function (requestType) {
  return async (context) => {
    const {
      params
    } = context;

    const {
      Model
    } = context.app.service(context.path);

    let result;
    

    // if FIND is called, assign the result to the data array []
    // if GET is called, assign it directly to result
    if (requestType === "FIND"){
      result = await Model.find(params.query)
      .populate({
        path: 'branches.links.link',
        model: 'links'})
      .exec();

      context.result = Object.assign({'data': []}, context.result)
      context.result.data = result;
    } else if (requestType === "GET"){
      result = await Model.findOne(params.query)
      .populate({
        path: 'branches.links.link',
        model: 'links'})
      .exec();

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
    create: [authenticate('jwt'), addOwner(), addDefaultBranch(), addUniqueName(),setRandomColor()],
    update: [authenticate('jwt'), checkPermissions()],
    patch: [authenticate('jwt'), checkPermissions()],
    remove: [authenticate('jwt'), checkPermissions()]
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
