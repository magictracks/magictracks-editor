const feathersClient = require("../feathersClient");

module.exports = store

store.storeName = 'recipes'
function store (state, emitter) {
  let recipes = new Recipes();
  
  state.recipes = [];  

  state.events.recipes_find = "recipes:find";
  state.events.recipes_createAndPush = "recipes:createAndPush";
  state.events.recipes_create = "recipes:create";
  state.events.recipes_addBranchAndPush = "recipes:addBranchAndPush";
  state.events.recipes_addBranch = "recipes:addBranch";
  state.events.recipes_reorderLinks = "recipes:reorderLinks";
  state.events.recipes_removeLink = "recipes:removeLink";
  state.events.recipes_setSelectedBranch = "recipes:setSelectedBranch";
  state.events.recipes_updateDetails = "recipes:updateDetails";
  
  feathersClient.service("recipes").find()
    .then(feature => {
      state.recipes = feature.data;
      emitter.emit(state.events.RENDER);
    });
  
  // emitter.on('DOMContentLoaded', function () {})

  emitter.on(state.events.recipes_find, recipes.find);
  emitter.on(state.events.recipes_createAndPush, recipes.createAndPush);
  emitter.on(state.events.recipes_create, recipes.create);
  emitter.on(state.events.recipes_addBranchAndPush, recipes.addBranchAndPush);
  emitter.on(state.events.recipes_addBranch, recipes.addBranch);
  emitter.on(state.events.recipes_removeLink, recipes.removeLink);
  emitter.on(state.events.recipes_reorderLinks, recipes.reorderLinks);
  emitter.on(state.events.recipes_updateDetails, recipes.updateDetails);
  emitter.on(state.events.recipes_setSelectedBranch, recipes.setSelectedBranch);

  feathersClient.service("recipes").on('patched', message => {
    // emitter.emit(state.events.recipes_find, {})
    emitter.emit('navigate');
  });

  function Recipes(){

    this.updateDetails = function(_payload){

        const {_id} = state.current.recipes.selected;
        const {title, description} = _payload
  
        let patchData = {
          title,
          description
        }
        
        feathersClient.service("recipes").patch(_id, patchData, null).then(patchedFeature => {
  
          emitter.emit(state.events.current_setSelected, {'collection':'recipes', 'id':patchedFeature._id})
          return patchedFeature
        }).catch(err => {
          return err;
        })

    }

    this.setSelectedBranch = function(_payload){
      const {id, user, collection, branch} = state.params;
      const recipeid = state.current.recipes.selected._id;
      const {updatedBranchName} = _payload;
      
      let patchData = {
        selectedBranch: updatedBranchName
      }

      console.log("I'm the patched data", patchData)

      feathersClient.service("recipes").patch(recipeid, patchData, null).then(patchedFeature => {
        
        console.log(patchedFeature);

        // TODO: is there a better way to update?
        // state.recipes.forEach(item => {
        //   if(item._id == patchedFeature._id){
        //     item.selectedBranch = patchedFeature.selectedBranch
        //   }
        // });

        // emitter.emit('navigate')
        emitter.emit("pushState", `/${user}/${collection}/${id}/${branch}`)
        emitter.emit(state.events.RENDER);
      }).catch(err => {
        return err;
      })
    }

    this.removeLink = function(_payload){
      const {recipeId, linkId} = _payload;

      const query = {
        "query": {
          "branches._id": String(recipeId)
        }
      }

      console.log("remove link payload", query)
      
      const patchData = {
        "$pull":{
          "branches.$.links": {
            "link": String(linkId)
          }
        }
      }

      feathersClient.service("recipes").patch(null, patchData, query).then(feature => {
        console.log("patched feature success!", feature[0]);
        
        emitter.emit('navigate');

      }).catch(err => {
        return err;
      })

    }

    this.reorderLinks = function(_payload){
      
      function moveVal(arr, from, to) {
        arr.splice(to, 0, arr.splice(from, 1)[0]);
      };

      const {parentBranchId, parentCollection, linkId, newLinkPosition} = _payload;

      const query = {
        "query":{
          "branches._id": String(parentBranchId)
        }
      }
  


      feathersClient.service("recipes").get(null, query).then( response => {
        let linkList = [];
        let updateCmd = {"$set":{}};
        let currentPos;

        response = response.data[0];
        // linkList = response.links.map( _link => String(_link._id) );
        let selectedBranch = response.branches.find(branch => String(branch._id) == String(parentBranchId) )
        linkList = selectedBranch.links;

        currentPos = linkList.findIndex(val => {
          return val.link._id == linkId
        });
        
        console.log("currentpos 🌮",currentPos)

        moveVal(linkList, currentPos, newLinkPosition );  

        updateCmd['$set'] = {"branches.$.links": linkList};

        console.log(updateCmd, query);
        // emitter.emit(state.events.RENDER)
        return feathersClient.service("recipes").patch(null, updateCmd, query)
      }).then(patchedFeature => {

        
        
        // TODO: figure out better way to update view
        state.current.recipes.selected = patchedFeature[0];
        emitter.emit(state.events.playlists_find, {})
        emitter.emit(state.events.RENDER);
      }).catch(err => {
        return err;
      })

    }


    this.find = function(_query){
      feathersClient.service("recipes").find(_query).then(feature => {
        state.recipes = feature.data;
        emitter.emit(state.events.RENDER);
      });
    }

    this.create = function(_payload){

      const {recipeData} = _payload;

      feathersClient.service("recipes").create(recipeData)
      .then(feature => {
        // state.recipes = feature.data;
        console.log(feature);
        state.recipes.push(feature);
        // emitter.emit(state.events.RENDER);
        emitter.emit(state.events.recipes_find, {"query": {"owner": state.user.username }} );
      }).catch(err => {
        console.log(err);
        return err
      });
    }

    this.createAndPush = function(_payload){

      console.log(_payload)
      const {recipeData, projectId, projectBranchName} = _payload;

      feathersClient.service('recipes').create(recipeData).then(feature => {
        state.recipes.push(feature);

        console.log("new recipe!", feature);
        
        let idQuery = {
          "query":{
            "_id": projectId,
            "branches.branchName": projectBranchName
          }
        }

        let projectPatch = {
          "$push":{
          "branches.$.recipes":{
            "branchName":"default",
            "recipe": feature._id
            }
          }
        }

        return feathersClient.service("projects").patch(null, projectPatch, idQuery)
      }).then(patchedFeature => {
        // 
        console.log(patchedFeature);
        emitter.emit(state.events.projects_find, {});
        // emitter.emit(state.events.recipes_find);
      })
      .catch(err => {
          console.log("ERROR: 🔥🔥🔥🔥", err);
          emitter.emit(state.events.RENDER);
      });

    } // end createAndPush

    this.addBranch = function(_payload){
      const {recipeId} = _payload;
      
      // TODO: handle name generation on server
       let recipePatch = {
        "$push":{
        "branches":{
          "description":`new branch created ${new Date()}`
          }
        }
      }

      feathersClient.service("recipes").patch(recipeId, recipePatch,null).then(feature => {

        // const {projectId, projectBranchName, recipeId, recipeBranchName} = _payload;
        // TODO: get the latest made branch in a better way
        // _payload.recipeBranchName = feature.branches[feature.branches.length - 1].branchName
        emitter.emit('navigate');
        // emitter.emit(state.events.projects_pushRecipe, _payload);
      }).catch(err => {
        return err;
      })


    }

    this.addBranchAndPush = function(_payload){
      console.log("adding new branch and push");
      const {recipeId, projectId, projectBranchName} = _payload;

      // TODO: handle name generation on server
      let recipePatch = {
        "$push":{
        "branches":{
          "description":`new branch created ${new Date()}`
          }
        }
      }

      console.log("recipeId from addBranchAndPush", recipeId)

      feathersClient.service("recipes").patch(recipeId, recipePatch,null).then(feature => {

        // const {projectId, projectBranchName, recipeId, recipeBranchName} = _payload;
        // TODO: get the latest made branch in a better way
        _payload.recipeBranchName = feature.branches[feature.branches.length - 1].branchName
        
        emitter.emit(state.events.projects_pushRecipe, _payload);
      }).catch(err => {
        return err;
      })

    } // end addBranch

    

  } // end Recipe

}