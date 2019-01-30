module.exports = store

store.storeName = 'editLinkModal'
function store (state, emitter) {
  const editLinkModal = new EditLinkModal();
  
  state.editLinkModal = {
    display: false,
    feature:{},
  }

  state.events.editLinkModal_open = "editLinkModal:open"
  state.events.editLinkModal_close = "editLinkModal:close"
  state.events.editLinkModal_setFeature = "editLinkModal:setFeature"

  // emitter.on('DOMContentLoaded', function () {})
  emitter.on(state.events.editLinkModal_open , editLinkModal.open)
  emitter.on(state.events.editLinkModal_close , editLinkModal.close)
  emitter.on(state.events.editLinkModal_setFeature , editLinkModal.setFeature)

  // emitter.on('DOMContentLoaded', function(){
  //   emitter.on(state.events.projects_find, editLinkModal.setProject)
  // })

  function EditLinkModal(){

    this.open = function(){
      state.editLinkModal.display = true;
      emitter.emit(state.events.RENDER);
    }

    this.close = function(){
      state.editLinkModal.display = false;
      emitter.emit(state.events.RENDER);
    }

    this.setFeature = function(){
      const{ collection, id, branch} = state.params
      
      state.editLinkModal.feature = state.links.find( item => {
        return item._id == String(id)
      });

      emitter.emit(state.events.RENDER);
    }

  }
}