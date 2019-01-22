const feathersClient = require("../feathersClient");

module.exports = store

store.storeName = 'projects'
function store (state, emitter) {
  const projects = new Projects();

  state.projects = [];

  state.events.projects_find = "projects:find";
  state.events.projects_createBranch = "projects:createBranch";
  state.events.projects_changeBranchName = "projects:changeBranchName";
  state.events.projects_setSelectedBranch = "projects:setSelectedBranch";
  state.events.projects_get = "projects:get";
  state.events.projects_pushRecipe = "projects:pushRecipe";

  state.events.projects_updateDetails = "projects:updateDetails";
  
  feathersClient.service("projects").find()
    .then(feature => {
      state.projects = feature.data;
      emitter.emit(state.events.RENDER);
    });

  // find projects
  emitter.on(state.events.projects_find, projects.find);
  emitter.on(state.events.projects_pushRecipe, projects.pushRecipe);
  emitter.on(state.events.projects_createBranch, projects.createBranch);
  emitter.on(state.events.projects_changeBranchName, projects.changeBranchName);
  emitter.on(state.events.projects_setSelectedBranch, projects.setSelectedBranch);
  emitter.on(state.events.projects_updateDetails, projects.updateDetails);

  feathersClient.service("projects").on('patched', message => {
    emitter.emit(state.events.projects_find, {})
  });

  function Projects(){

    this.updateDetails = function(_payload){
      const {id} = state.params
      const {title, description} = _payload

      let patchData = {
        title,
        description
      }
      
      feathersClient.service("projects").patch(id, patchData, null).then(patchedFeature => {
        return patchedFeature
      }).catch(err => {
        return err;
      })
    }

    this.changeBranchName = function(_payload){
      const {id} = state.params

      const {updatedBranchId, updatedBranchName} = _payload;
      const idQuery = {
        "query":{
          "_id": id,
          "branches._id":updatedBranchId
        }
      }
      const patchData = {
        "$set":{
          "branches.$.branchName":updatedBranchName
        }
      }

      feathersClient.service("projects").patch(null, patchData, idQuery).then(patchedFeature => {
        console.log(patchedFeature);

        emitter.emit(state.events.projects_setSelectedBranch, {updatedBranchName})
        // emitter.emit(state.events.projects_find, {})
      }).catch(err => {
        return err;
      })
    }

    this.setSelectedBranch = function(_payload){
      const {id, user, collection} = state.params;
      const {updatedBranchName} = _payload;
      
      let patchData = {
        selectedBranch: updatedBranchName
      }

      feathersClient.service("projects").patch(id, patchData, null).then(patchedFeature => {
        
        console.log(patchedFeature);

        // TODO: is there a better way to update?
        state.projects.forEach(item => {
          if(item._id == patchedFeature._id){
            item.selectedBranch = patchedFeature.selectedBranch
          }
        });
        
        emitter.emit("pushState", `/${user}/${collection}/${id}/${patchedFeature.selectedBranch}`)
        emitter.emit(state.events.RENDER);
      }).catch(err => {
        return err;
      })
    }

    this.createBranch = function(_payload){
      const {id} = state.params;

      const projectPatch = {
        "$push":{
          "branches":{
            "description":"new project branch"
          }
        }
      }
      feathersClient.service("projects").patch(id,projectPatch, null).then(patchedFeature => {
        console.log("added branch!", patchedFeature);
        emitter.emit(state.events.projects_find, {});
      })
    }

    

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