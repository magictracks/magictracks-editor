const {
  authenticate
} = require('@feathersjs/authentication').hooks;
const addOwner = require('../../hooks/add-owner.js');
const addDefaultBranch = require('../../hooks/add-default-branch.js');
const addUniqueName = require('../../hooks/add-unique-name.js');
const setRandomColor = require('../../hooks/set-random-color.js');
const checkPermissions = require('../../hooks/check-permissions.js');
const populateStep = require('../../hooks/populate-step.js');
const checkBranchOwner = require('../../hooks/check-branch-owner.js');

module.exports = {
  before: {
    all: [],
    find: [populateStep('FIND')],
    get: [populateStep('GET')],
    create: [authenticate('jwt'), addOwner(), addDefaultBranch(), addUniqueName(),setRandomColor()],
    update: [authenticate('jwt'), checkPermissions()],
    patch: [authenticate('jwt'), checkPermissions(), checkBranchOwner()],
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
