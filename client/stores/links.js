const feathersClient = require("../feathersClient");

module.exports = store

store.storeName = 'links'
function store (state, emitter) {
  const links = new Links();
  state.links = [];


  state.events.links_create = "links:create";
  state.events.links_createAndPush = "links:createAndPush";

  feathersClient.service("links").find()
    .then(feature => {
      state.links = feature.data;
      emitter.emit(state.events.RENDER);
    });
  

  emitter.on('DOMContentLoaded', function () {
  });

  emitter.on(state.events.links_create, links.create);
  emitter.on(state.events.links_createAndPush, links.createAndPush);


  function Links(){

    this.create = function(_payload){

      // feathersClient.service('links').create()
    }

    this.createAndPush = function(_payload){
      // feathersClient.service('links').create()

    }

  }
}