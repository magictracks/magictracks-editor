const feathersClient = require("../feathersClient");

module.exports = store

store.storeName = 'projects'
function store (state, emitter) {
  const projects = new Projects();

  state.projects = [];

  state.events.projects_find = "projects:find";
  state.events.projects_get = "projects:get";
  
  feathersClient.service("projects").find()
    .then(feature => {
      state.projects = feature.data;
      emitter.emit(state.events.RENDER);
    });

  // find projects
  emitter.on(state.events.projects_find, projects.find);


  function Projects(){

    this.find = function(_query){
      feathersClient.service("projects").find(_query).then(features => {
        state.projects = features.data;
        emitter.emit(state.events.RENDER);
      });
    }

    this.pushRecipe = function(_payload){

    }
  } // end projects

  // emitter.on('DOMContentLoaded', function () {})

}