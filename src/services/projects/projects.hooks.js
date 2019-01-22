const {
  authenticate
} = require('@feathersjs/authentication').hooks;
const addOwner = require('../../hooks/add-owner.js');
const addDefaultBranch = require('../../hooks/add-default-branch.js');
const addUniqueName = require('../../hooks/add-unique-name.js');
const setRandomColor = require('../../hooks/set-random-color.js');
const populateFeature = require('../../hooks/populate-feature.js');
const addOrigin = require('../../hooks/add-origin.js');
const checkBranchOwner = require('../../hooks/check-branch-owner.js');

const checkPermissions = require('../../hooks/check-permissions.js');
const addUniqueBranchName = require('../../hooks/add-unique-branch-name.js');


module.exports = {
  before: {
    all: [],
    find: [
      
    ],
    get: [

    ],
    create: [
      authenticate('jwt'), 
      addOwner(), 
      addDefaultBranch(), 
      addUniqueName(), 
      setRandomColor()
    ],
    update: [
      authenticate('jwt'), checkPermissions()
    ],
    patch: [
      authenticate('jwt'), checkPermissions(), checkBranchOwner(), addUniqueBranchName()
    ],
    remove: [
      authenticate('jwt'), checkPermissions()
    ]
  },

  after: {
    all: [],
    find: [populateFeature("FIND")],
    get: [populateFeature("GET")],
    create: [addOrigin()],
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
