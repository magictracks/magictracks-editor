const feathersClient = require("../feathersClient");

module.exports = store

store.storeName = 'projects'
function store (state, emitter) {
  state.projects = [];

  state.events.find_projects = "projects:find";
  state.events.get_project = "projects:get";
  
  feathersClient.service("projects").find()
    .then(feature => {
      console.log(feature);
      state.projects = feature.data;
      emitter.emit(state.events.RENDER);
    });

  emitter.on('DOMContentLoaded', function () {
    
  })

  // find projects
  emitter.on(state.events.find_projects, function(_query){
    feathersClient.service("projects").find(_query).then(features => {
      console.log(features);
      state.projects = features.data;
      emitter.emit(state.events.RENDER);
    });
  });


  // emitter.on(state.events.get_project, function(_query){

  //   feathersClient.service("projects").get(_query).then(feature => {


  //   })
  // })
  
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