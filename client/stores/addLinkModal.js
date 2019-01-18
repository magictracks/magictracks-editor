module.exports = store

store.storeName = 'addLinkModal'
function store (state, emitter) {
  
  let addLinkModal = new AddLinkModal();
  
  state.addLinkModal = {
    display: false,
    selectLink: null,

  }


  state.events.addLinkModal_open = "addLinkModal:open";
  state.events.addLinkModal_close = "addLinkModal:close";
  state.events.addLinkModal_selectLink = "addLinkModal:selectLink";


  emitter.on(state.events.addLinkModal_open, addLinkModal.open);
  emitter.on(state.events.addLinkModal_close, addLinkModal.close);
  emitter.on(state.events.addLinkModal_selectLink, addLinkModal.selectLink);

  
  function AddLinkModal(){

    this.open = function(){
      state.addLinkModal.display = true;
      emitter.emit(state.events.RENDER)
    }

    this.close = function(){
      state.addLinkModal.display = false;
      emitter.emit(state.events.RENDER)
    }

    this.selectLink = function(_linkId){
      state.addLinkModal.selectLink = _linkId;
      emitter.emit(state.events.RENDER)
    }

  } // add recipeModal
}