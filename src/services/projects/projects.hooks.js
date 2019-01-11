const {
  authenticate
} = require('@feathersjs/authentication').hooks;
const addOwner = require('../../hooks/add-owner.js');
const addDefaultBranch = require('../../hooks/add-default-branch.js');
const addUniqueName = require('../../hooks/add-unique-name.js');
const setRandomColor = require('../../hooks/set-random-color.js');

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
        path: 'branches.playlists.playlist',
        model: 'playlists',
        populate:{
          path: 'branches.links.link',
          model: 'links'
        }
      })
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

const checkBranchOwner = function (options = {}) {
  return async context => {

    const {params} = context;
    const {Model} = context.app.service(context.path);

    const result = await Model.findOne(params.query)
      .populate({
        path: 'branches.playlists.playlist',
        model: 'playlists',
        populate:{
          path: 'branches.links.link',
          model: 'links'
        }
      })
      .exec();

    
    // console.log(context.data)
    console.log("🦄🦄", params.query);
    console.log("🦄🦄🦄", result);
    /**
    { '$push':
      { branches:
        { branchName: 'my branch 1',
        description: 'my super exciting awesome time in NYC' } } }
    */

    // Check who the owner is
    // if the owner of the project is the user, then add the branch owner
    // otherwise, TODO: throw an error or offer to create a new copy
    if(result.owner === params.user.username){

      if(context.data.hasOwnProperty("$push") && typeof context.data.$push.branches === 'object'){
        // if there is no branch owner, set it in the PATCH
        if(!context.data.$push.branches.hasOwnProperty('branchOwner')){
          context.data.$push.branches.branchOwner = params.user.username;
        } 
      }
      if(context.data.hasOwnProperty("$pull")){
        console.log("pulling specified branch!")
      }
    } else{
      console.log("TODO: you're not the owner, but you can make a new copy")
    }
    return context;
  };
};


module.exports = {
  before: {
    all: [],
    find: [populateLinks("FIND")],
    get: [populateLinks("GET")],
    create: [authenticate('jwt'), addOwner(), addDefaultBranch(), addUniqueName(), setRandomColor()],
    update: [],
    patch: [authenticate('jwt'), checkBranchOwner()],
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
