const feathersClient = require("../feathersClient");

module.exports = store

store.storeName = 'projects'
function store (state, emitter) {
  const projects = new Projects();

  state.projects = [];

  state.events.projects_find = "projects:find";
  state.events.projects_get = "projects:get";
  state.events.projects_pushRecipe = "projects:pushRecipe";
  
  feathersClient.service("projects").find()
    .then(feature => {
      state.projects = feature.data;
      emitter.emit(state.events.RENDER);
    });

  // find projects
  emitter.on(state.events.projects_find, projects.find);
  emitter.on(state.events.projects_pushRecipe, projects.pushRecipe);


  function Projects(){

    this.find = function(_query){
      feathersClient.service("projects").find(_query).then(features => {
        state.projects = features.data;
        emitter.emit(state.events.RENDER);
      });
    }

    this.pushRecipe = function(_payload){
      console.log(_payload);

      const {projectId, projectBranchName, recipeId, recipeBranchName} = _payload;
      
      let idQuery = {
        "query":{
          "_id": projectId,
          "branches.branchName": projectBranchName
        }
      }

      let projectPatch = {
        "$push":{
        "branches.$.recipes":{
          "selectedBranch":recipeBranchName,
          "recipe": recipeId
          }
        }
      }

      feathersClient.service("projects").patch(null, projectPatch, idQuery).then(feature => {
        emitter.emit(state.events.projects_find);
      }).catch(err => {
        console.log("🔥🔥🔥🔥", err)
        return err
      });

    }
  } // end projects

  // emitter.on('DOMContentLoaded', function () {})

}