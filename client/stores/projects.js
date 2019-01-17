const feathersClient = require("../feathersClient");

module.exports = store

store.storeName = 'projects'
function store (state, emitter) {
  const projects = new Projects();

  state.projects = [];

  state.events.find_projects = "projects:find";
  state.events.get_project = "projects:get";
  
  feathersClient.service("projects").find()
    .then(feature => {
      state.projects = feature.data;
      emitter.emit(state.events.RENDER);
    });

  emitter.on('DOMContentLoaded', function () {
    
  })

  // find projects
  emitter.on(state.events.find_projects, projects.find);


  function Projects(){

    this.find = function(_query){
      feathersClient.service("projects").find(_query).then(features => {
        state.projects = features.data;
        emitter.emit(state.events.RENDER);
      });
    }
  }


}