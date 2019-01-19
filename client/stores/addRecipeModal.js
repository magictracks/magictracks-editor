const feathersClient = require("../feathersClient");

module.exports = store

store.storeName = 'addRecipeModal'
function store (state, emitter) {
  let addRecipeModal = new AddRecipeModal();
  
  state.addRecipeModal = {
    display: false,
    selectProjectId:null,
    selectProjectBranchName: null,
    selectRecipe: null,
    selectRecipeBranches: [],
    selectRecipeBranchName: 'default'
  }


  state.events.addRecipeModal_open = "addRecipeModal:open";
  state.events.addRecipeModal_close = "addRecipeModal:close";
  state.events.addRecipeModal_selectRecipe = "addRecipeModal:selectRecipe";
  state.events.addRecipeModal_selectRecipeBranch = "addRecipeModal:selectRecipeBranch";
  state.events.addRecipeModal_selectProjectId = "addRecipeModal:selectProjectId";
  state.events.addRecipeModal_selectProjectBranchName = "addRecipeModal:selectProjectBranchName";


  emitter.on(state.events.addRecipeModal_open, addRecipeModal.open);
  emitter.on(state.events.addRecipeModal_close, addRecipeModal.close);
  emitter.on(state.events.addRecipeModal_selectRecipe, addRecipeModal.selectRecipe);
  emitter.on(state.events.addRecipeModal_selectRecipeBranch, addRecipeModal.selectRecipeBranch);

  emitter.on(state.events.addRecipeModal_selectProjectId, addRecipeModal.selectProjectId);
  emitter.on(state.events.addRecipeModal_selectProjectBranchName, addRecipeModal.selectProjectBranchName);


  function AddRecipeModal(){

    this.open = function(){
      state.addRecipeModal.display = true;
      emitter.emit(state.events.RENDER)
    }

    this.close = function(){
      state.addRecipeModal.display = false;
      emitter.emit(state.events.RENDER)
    }

    this.selectRecipe = function(_recipeId){
      state.addRecipeModal.selectRecipe = String(_recipeId);

      feathersClient.service("recipes").get(String(_recipeId)).then(feature => {
        console.log(feature);
        state.addRecipeModal.selectRecipeBranches = feature.branches;
        emitter.emit(state.events.RENDER)
      }).catch(err => {
        console.log(err);
        return err
      });
      
    }

    this.selectRecipeBranch = function(_branchName){
      state.addRecipeModal.selectRecipeBranch = _branchName;
    }

    this.selectProjectId = function(_projectId){
      state.addRecipeModal.selectProjectId = _projectId;
    }

    this.selectProjectBranchName = function(_projectBranchName){
      state.addRecipeModal.selectProjectBranchName = _projectBranchName;
    }

  } // add recipeModal

  
}