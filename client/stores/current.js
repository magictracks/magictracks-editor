const feathersClient = require("../feathersClient");

module.exports = store

store.storeName = 'current';
function store (state, emitter) {
  const current = new Current();

  state.current = {
    projects:{
      selected:{},
      id:null,
      branch:'default'
    },
    recipe:{
      selected:{},
      id:null,
      branch:'default'
    },
    link:{
      selected:{},
      id:null,
      branch:'default'
    },
  }

  state.events.current_navigated = "current:navigated";


  emitter.on('navigate', current.navigated);
  emitter.on('DOMContentLoaded', current.navigated);


  function Current(){
    
    this.navigated = function(){
      console.log(`Navigated to ${state.route}`)
      console.log("state.params:", state.params)

      if(state.params.hasOwnProperty('user') && !state.params.hasOwnProperty('collection')){
        console.log("hey!  that's me!")
        emitter.emit('pushState', `/${user}/projects`);
      }

      // if navigating to a user profile...
      // if user/collection/
      if(state.params.hasOwnProperty('user') && state.params.hasOwnProperty('collection')){
        const {user, collection, id} = state.params;
        let query = {
          "query":{
            "$or": [
              {"owner": user}, 
              {"collaborators": [user]}
            ]
          }
        }

        feathersClient.service(collection).find(query).then(features => {
          state[collection] = features.data;
          emitter.emit(state.events.RENDER);
        }).catch(err => {
          return err;
        });

      } 
      
      // if user/collection/id
      if (state.params.hasOwnProperty('user') && state.params.hasOwnProperty('collection') && state.params.hasOwnProperty('id') ){
        const {user, collection, id} = state.params;
        
        feathersClient.service(collection).get(id).then(feature => {
          state.current[collection].selected = feature;
          state.current[collection].id = feature._id;
          state.current[collection].branch = feature.selectedBranch;
          // emitter.emit("pushState", `/${user}/${collection}/${id}/${feature.selectedBranch}`);
          emitter.emit(state.events.RENDER);
        }).catch(err => {
          return err;
        });

      }

      // if user/collection/id/branch
      if (state.params.hasOwnProperty('user') && state.params.hasOwnProperty('collection') && state.params.hasOwnProperty('id') &&  state.params.hasOwnProperty('branch')){
        const {user, collection, id, branch} = state.params;
        
        feathersClient.service(collection).get(id).then(feature => {

          state.current[collection].selected = feature;
          state.current[collection].id = feature._id;
          // TODO: do error checking ot see if branch exists, if not, go to selectedBranch
          let checkBranchExists = feature.branches.some( item => item.branchName == branch);
          
          if(checkBranchExists){
            state.current[collection].branch = branch;
          } else {
            state.current[collection].branch = feature.selectedBranch;
          }
          
          // emitter.emit("pushState", `/${user}/${collection}/${id}/${feature.selectedBranch}`);
          emitter.emit(state.events.RENDER);
        }).catch(err => {
          return err;
        });

      }

    } // end navigated()

  } // end Current


  // emitter.on('DOMContentLoaded', function () {})
}
