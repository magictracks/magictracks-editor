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

      const {linkData} = _payload;
      feathersClient.service('links').create(linkData).then(feature => {
        state.links.push(feature);
        emitter.emit(state.events.RENDER);
      }).catch(err => {
        console.log("ERROR: 🔥🔥🔥🔥", err);
        emitter.emit(state.events.RENDER);
      });
    }

    this.createAndPush = function(_payload){

      const {linkData, recipeId, recipeBranchName} = _payload;

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
          "link": null
          }
        }
      }

      feathersClient.service('links').create(linkData).then(feature => {
        state.links.push(feature);
        
        recipePatch.$push["branches.$.links"].link = feature._id

        return feathersClient.service("recipes").patch(null, recipePatch, idQuery)
      }).then(patchedFeature => {

        emitter.emit(state.events.projects_find, {});

      })
      .catch(err => {
        
        if(err.code === 409){
          console.log("FEATURE ALREADY EXISTS", err);
          
          let getQuery = {
            "query":{
              "url": err.errors.url
            }
          };

          feathersClient.service('links').find(getQuery).then(features => {

            recipePatch.$push['branches.$.links'].link = features.data[0]._id;

            return feathersClient.service("recipes").patch(null, recipePatch, idQuery)
          }).then(patchedFeature => {
            
            console.log("🐞🐞🐞🐞I'm the patched feature!", patchedFeature)
            emitter.emit(state.events.projects_find, {});

          }).catch(innerErr => {
            return innerErr
          })
        } else{
          console.log("ERROR: 🔥🔥🔥🔥", err);
          emitter.emit(state.events.RENDER);
        }
      });

    }

  } // end Links
}