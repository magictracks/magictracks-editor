const feathersClient = require("../feathersClient");

module.exports = store

store.storeName = 'recipes'
function store (state, emitter) {
  let recipes = new Recipes();
  
  state.recipes = [];  

  state.events.recipes_find = "recipes:find";
  state.events.recipes_createAndPush = "recipes:createAndPush";
  state.events.recipes_create = "recipes:create";
  
  feathersClient.service("recipes").find()
    .then(feature => {
      state.recipes = feature.data;
      emitter.emit(state.events.RENDER);
    });
  
  emitter.on('DOMContentLoaded', function () {

  })

  emitter.on(state.events.recipes_find, recipes.find);
  emitter.on(state.events.recipes_createAndPush, recipes.createAndPush);
  emitter.on(state.events.recipes_create, recipes.create);


  function Recipes(){
    this.find = function(_query){
      feathersClient.service("recipes").find(_query)
      .then(feature => {
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
        emitter.emit(state.events.recipes_find, {});
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
  } // end Recipe

}