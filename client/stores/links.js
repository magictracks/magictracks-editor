const feathersClient = require("../feathersClient");

module.exports = store

store.storeName = 'links'
function store (state, emitter) {
  state.links = [];

  feathersClient.service("links").find()
    .then(feature => {
      state.links = feature.data;
      emitter.emit(state.events.RENDER);
    });
  

  emitter.on('DOMContentLoaded', function () {
  })
}