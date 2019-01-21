var css = require('sheetify')
var choo = require('choo')
const feathersClient = require('./feathersClient');

css('tachyons')

var app = choo()
if (process.env.NODE_ENV !== 'production') {
  app.use(require('choo-devtools')())
} else {
  app.use(require('choo-service-worker')())
}


// Stores
app.use(require('./stores/projects'))
app.use(require('./stores/recipes'))
app.use(require('./stores/addLinkModal'))
app.use(require('./stores/addRecipeModal'))
app.use(require('./stores/links'))
app.use(require('./stores/search'))
app.use(require('./stores/user'))

// Views
app.route('/', require('./views/main'))
app.route('/login', require('./views/login'));
app.route('/signup', require('./views/signup'));
app.route('/about', require('./views/about'));
app.route('/settings', require('./views/settings'))
app.route('/search', require('./views/search'))
app.route('/search/:collection', require('./views/search'))

app.route('/:user', require('./views/user'))
app.route('/:user/:collection', require('./views/user'))
app.route('/:user/:collection/:id', require('./views/user'))
app.route('/:user/:collection/:id/:branch', require('./views/user'))

// app.route('/dev-ref', require('./views/dev-ref'))
// app.route('/*', require('./views/404'))

app.use((state, emitter) => {                  // 1.
  
  emitter.on('navigate', () => {               // 2.
    console.log("on navigate...")
    console.log(`Navigated to ${state.route}`) // 3.
    //console.log(`URL Params to ${JSON.stringify(state.params)}`) // 3.

    // if navigating to a user profile...
    if(state.params.hasOwnProperty('user') && state.params.hasOwnProperty('collection')){
      
      let query = {"query":{
        "$or": [
          {"owner": state.params.user}, {"collaborators": [state.params.user]}
        ]
        }
      }

      feathersClient.service(state.params.collection).find(query).then(features => {
        state[state.params.collection] = features.data;
        emitter.emit(state.events.RENDER);
      }).catch(err => {
        return err;
      })
    }

    // // TEMP: route the edit to default on playlists
    // if(state.route == "edit"){
    //   emitter.emit("replaceState", "/edit/playlists")
    // }
    // // TEMP: route the browse to default on playlists
    // if(state.route == "browse"){
    //   emitter.emit("replaceState", "/browse/playlists")
    // }

  });
})



module.exports = app.mount('body')
