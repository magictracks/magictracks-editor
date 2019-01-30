module.exports = store

store.storeName = 'editRecipeModal'
function store (state, emitter) {
  const editRecipeModal = new EditRecipeModal();
  
  state.editRecipeModal = {
    display: false,
  }

  state.events.editRecipeModal_open = "editRecipeModal:open"
  state.events.editRecipeModal_close = "editRecipeModal:close"
  state.events.editRecipeModal_setFeature = "editRecipeModal:setFeature"

  // emitter.on('DOMContentLoaded', function () {})
  emitter.on(state.events.editRecipeModal_open , editRecipeModal.open)
  emitter.on(state.events.editRecipeModal_close , editRecipeModal.close)
  // emitter.on(state.events.editRecipeModal_setFeature , editRecipeModal.setFeature)

  // emitter.on('DOMContentLoaded', function(){
  //   emitter.on(state.events.projects_find, editRecipeModal.setProject)
  // })

  function EditRecipeModal(){

    this.open = function(){
      state.editRecipeModal.display = true;
      emitter.emit(state.events.RENDER);
    }

    this.close = function(){
      state.editRecipeModal.display = false;
      emitter.emit(state.events.RENDER);
    }

    // this.setFeature = function(){
    //   const{ collection, id, branch} = state.params
      
    //   state.editRecipeModal.feature = state.recipes.find( item => {
    //     return item._id == String(id)
    //   });

    //   emitter.emit(state.events.RENDER);
    // }

  }
}