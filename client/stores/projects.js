const feathersClient = require("../feathersClient");

module.exports = store

store.storeName = 'projects'
function store (state, emitter) {
  const projects = new Projects();

  state.projects = [];

  state.events.projects_get = "projects:get";
  state.events.projects_find = "projects:find";
  state.events.projects_deleteProject = "projects:deleteProject";
  state.events.projects_create = "projects:create";
  state.events.projects_createBranch = "projects:createBranch";
  state.events.projects_changeBranchName = "projects:changeBranchName";
  state.events.projects_setSelectedBranch = "projects:setSelectedBranch";
  state.events.projects_pushRecipe = "projects:pushRecipe";
  state.events.projects_updateDetails = "projects:updateDetails";
  state.events.projects_reorderRecipes = "projects:reorderRecipes";
  state.events.projects_removeRecipe = "projects:removeRecipe";
  
  feathersClient.service("projects").find()
    .then(feature => {
      state.projects = feature.data;
      emitter.emit(state.events.RENDER);
    });

  // find projects
  emitter.on(state.events.projects_find, projects.find);
  emitter.on(state.events.projects_deleteProject, projects.deleteProject);
  emitter.on(state.events.projects_create, projects.create);
  emitter.on(state.events.projects_pushRecipe, projects.pushRecipe);
  emitter.on(state.events.projects_createBranch, projects.createBranch);
  emitter.on(state.events.projects_changeBranchName, projects.changeBranchName);
  emitter.on(state.events.projects_setSelectedBranch, projects.setSelectedBranch);
  emitter.on(state.events.projects_updateDetails, projects.updateDetails);
  emitter.on(state.events.projects_reorderRecipes, projects.reorderRecipes);
  emitter.on(state.events.projects_removeRecipe, projects.removeRecipe);
  
  feathersClient.service("projects").on('patched', message => {
    emitter.emit(state.events.projects_find, {})
  });

  function Projects(){

    this.deleteProject = function(_payload){
      const{projectId} = _payload;
      const {collection, user} = state.params;

      feathersClient.service('projects').remove(String(projectId), null).then(response => {
        console.log("deleted project!");

        emitter.emit("pushState", `/${user}/${collection}`);
      }).catch(err => {
        return err;
      })

    }

    this.removeRecipe = function(_payload){
      const {projectId, recipeId} = _payload;

      const query = {
        "query": {
          "branches._id": String(projectId)
        }
      }

      console.log("remove recipe payload", query)
      
      const patchData = {
        "$pull":{
          "branches.$.recipes": {
            "recipe": String(recipeId)
          }
        }
      }

      feathersClient.service("projects").patch(null, patchData, query).then(feature => {
        console.log("patched feature success!", feature[0]);
        
        emitter.emit('navigate');

      }).catch(err => {
        return err;
      })

    }


    this.reorderRecipes = function(_payload){
      
      function moveVal(arr, from, to) {
        arr.splice(to, 0, arr.splice(from, 1)[0]);
      };

      const {parentBranchId, parentCollection, recipeId, newRecipePosition} = _payload;

      const query = {
        "query":{
          "branches._id": String(parentBranchId)
        }
      }
  
      feathersClient.service("projects").get(null, query).then( response => {
        let recipeList = [];
        let updateCmd = {"$set":{}};
        let currentPos;

        response = response.data[0];

        let selectedBranch = response.branches.find(branch => String(branch._id) == String(parentBranchId) )
        recipeList = selectedBranch.recipes;

        currentPos = recipeList.findIndex(val => {
          console.log(val.recipe._id, recipeId)
          return val.recipe._id == recipeId
        });
        
        moveVal(recipeList, currentPos, newRecipePosition );  

        updateCmd['$set'] = {"branches.$.recipes": recipeList};

        // emitter.emit(state.events.RENDER)
        return feathersClient.service("projects").patch(null, updateCmd, query)
      }).then(patchedFeature => {
        console.log("success!")
        console.log("patched feature!", patchedFeature[0]);
        state.current.projects.selected = patchedFeature[0];

        emitter.emit(state.events.current_setSelected, {collection:"projects", id: patchedFeature[0]._id});
        
        // TODO: figure out better way to update view
        emitter.emit(state.events.playlists_find, {})
        emitter.emit(state.events.RENDER);
      }).catch(err => {
        return err;
      })

    }

    this.create = function(_payload){
      
      const{projectData} = _payload;
      feathersClient.service("projects").create(projectData).then(newFeature => {
        console.log(newFeature)
        emitter.emit(state.events.projects_find, {})
      }).catch(err => {
        return err;
      });

    }

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