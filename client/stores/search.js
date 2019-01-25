module.exports = store

store.storeName = 'search'
function store (state, emitter) {
  const search = new Search();

  
  state.search = {
    collection:  ""
  };

  state.events.search_triggerSearch = "search:triggerSearch";


  emitter.on('DOMContentLoaded', function () {
    // search:triggerSearch
    emitter.on(state.events.search_triggerSearch, search.triggerSearch);

  }) // end DOMContentLoaded

  function Search(){

    this.triggerSearch = function(_payload){
      console.log(_payload.collection);
      // set the state to the collection selected
      state.search.collection = _payload.collection
      
      // do some DB sorting
      // TODO

      // render and pushState
      emitter.emit("pushState", `/search/${state.search.collection}`);
      emitter.emit(state.events.RENDER);
    }

  } // end Search
}