const feathersClient = require("../feathersClient");

module.exports = store

store.storeName = 'recipes'
function store (state, emitter) {
  state.recipes = [];
  
  feathersClient.service("recipes").find()
    .then(feature => {
      state.recipes = feature.data;
      emitter.emit(state.events.RENDER);
    });
  emitter.on('DOMContentLoaded', function () {
  })
}