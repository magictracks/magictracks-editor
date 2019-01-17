const feathersClient = require("../feathersClient");

module.exports = store

store.storeName = 'links'
function store (state, emitter) {
  const links = new Links();
  state.links = [];


  state.events.links_create = "links:create";
  state.events.links_createAndPush = "links:createAndPush";

  feathersClient.service("links").find()
    .then(feature => {
      state.links = feature.data;
      emitter.emit(state.events.RENDER);
    });
  

  emitter.on('DOMContentLoaded', function () {
  }); 

  emitter.on(state.events.links_create, links.create);
  emitter.on(state.events.links_createAndPush, links.createAndPush);


  function Links(){

    this.create = function(_payload){

      feathersClient.service('links').create(_payload).then(feature => {
        state.links.push(feature);
        emitter.emit(state.events.RENDER);
      }).catch(err => {
        console.log("ERROR: 🔥🔥🔥🔥", err);
        emitter.emit(state.events.RENDER);
      });
    }

    this.createAndPush = function(_payload){

      console.log(_payload)
      const {linkData, recipeId, recipeBranchName} = _payload;

      feathersClient.service('links').create(linkData).then(feature => {
        state.links.push(feature);

        console.log("new link!", feature);
        
        let idQuery = {
          "query":{
            "_id": recipeId,
            "branches.branchName": recipeBranchName
          }
        }

        let recipePatch = {
          "$push":{
          "branches.$.links":{
            "branchName":"default",
            "link": feature._id
            }
          }
        }

        return feathersClient.service("recipes").patch(null, recipePatch, idQuery)
      }).then(patchedFeature => {
        // 
        console.log(patchedFeature);
        emitter.emit(state.events.find_projects, {});
        // emitter.emit(state.events.recipes_find);
      })
      .catch(err => {
        
        if(err.code === 409){
          console.log("FEATURE ALREADY EXISTS", err);
          feathersClient.service('links').get({"url": err.errors.url}).then(feature => {
            recipePatch.$push.branches.$.links.link = feature._id;

            return feathersClient.service("recipes").patch(null, recipePatch, idQuery)
          }).then(patchedFeature => {
            emitter.emit(state.events.find_projects, {});
          })
        } else{
          console.log("ERROR: 🔥🔥🔥🔥", err);
          emitter.emit(state.events.RENDER);
        }
      });

    }

  } // end Links
}