const feathersClient = require("../feathersClient");

module.exports = store

store.storeName = 'ingredients'
function store (state, emitter) {
  state.ingredients = [];

  feathersClient.service("ingredient").find()
    .then(feature => {
      state.ingredients = feature.data;
      emitter.emit(state.events.RENDER);
    });
  

  emitter.on('DOMContentLoaded', function () {
  })
}