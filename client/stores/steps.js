const feathersClient = require("../feathersClient");

module.exports = store

store.storeName = 'steps'
function store (state, emitter) {
  state.steps = [];
  
  feathersClient.service("step").find()
    .then(feature => {
      state.steps = feature.data;
      emitter.emit(state.events.RENDER);
    });
  emitter.on('DOMContentLoaded', function () {
  })
}