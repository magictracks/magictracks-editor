module.exports = store

store.storeName = 'exportModal'
function store (state, emitter) {
  const exportModal = new ExportModal();
  
  state.exportModal = {
    display: false,
  }

  state.events.exportModal_open = "exportModal:open"
  state.events.exportModal_close = "exportModal:close"

  emitter.on(state.events.exportModal_open , exportModal.open)
  emitter.on(state.events.exportModal_close , exportModal.close)

  function ExportModal(){

    this.open = function(){
      state.exportModal.display = true;
      emitter.emit(state.events.RENDER);
    }

    this.close = function(){
      state.exportModal.display = false;
      emitter.emit(state.events.RENDER);
    }

  }
}