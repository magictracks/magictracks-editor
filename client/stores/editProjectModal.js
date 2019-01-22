module.exports = store

store.storeName = 'editProjectModal'
function store (state, emitter) {
  const editProjectModal = new EditProjectModal();
  
  state.editProjectModal = {
    display: false,
    project:{}
  }

  state.events.editProjectModal_open = "editProjectModal:open"
  state.events.editProjectModal_close = "editProjectModal:close"
  state.events.editProjectModal_setProject = "editProjectModal:setProject"

  // emitter.on('DOMContentLoaded', function () {})
  emitter.on(state.events.editProjectModal_open , editProjectModal.open)
  emitter.on(state.events.editProjectModal_close , editProjectModal.close)
  emitter.on(state.events.editProjectModal_setProject , editProjectModal.setProject)

  // emitter.on('DOMContentLoaded', function(){
  //   emitter.on(state.events.projects_find, editProjectModal.setProject)
  // })

  function EditProjectModal(){

    this.open = function(){
      state.editProjectModal.display = true;
      emitter.emit(state.events.RENDER);
    }

    this.close = function(){
      state.editProjectModal.display = false;
      emitter.emit(state.events.RENDER);
    }

    this.setProject = function(){
      const{ collection, id, branch} = state.params
      
      state.editProjectModal.project = state.projects.find( item => {
        return item._id == String(id)
      });

      emitter.emit(state.events.RENDER);
    }

  }
}