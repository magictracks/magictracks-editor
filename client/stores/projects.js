const feathersClient = require("../feathersClient");

module.exports = store

store.storeName = 'projects'
function store (state, emitter) {
  state.projects = [];
  
  feathersClient.service("projects").find()
    .then(feature => {
      console.log(feature);
      state.projects = feature.data;
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