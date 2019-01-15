const feathersClient = require("../feathersClient");

module.exports = store

store.storeName = 'recipes'
function store (state, emitter) {
  state.recipes = [];
  
  feathersClient.service("recipe").find()
    .then(feature => {
      state.recipes = feature.data;
      emitter.emit(state.events.RENDER);
    });

  emitter.on('DOMContentLoaded', function () {
    
  })

  
  // emitter.on('fetch-recipes', (username) => {   // 1.
  //   console.log(username);
  //   window.fetch(`/recipes`)        // 2.
  //     .then((res) => res.json())               // 3.
  //     .then((data) => {
  //       state.recipes = data.data              // 4.
  //       emitter.emit('render')
  //     })
  //     .catch((err) => {
  //       emitter.emit('error', err)             // 5.
  //     })
  // })


}