var css = require('sheetify')
var choo = require('choo')

css('tachyons')

var app = choo()
if (process.env.NODE_ENV !== 'production') {
  app.use(require('choo-devtools')())
} else {
  app.use(require('choo-service-worker')())
}


// Stores
// app.use(require('./stores/clicks'))
app.use(require('./stores/projects'))
app.use(require('./stores/recipes'))
app.use(require('./stores/links'))
app.use(require('./stores/user'))

// Views
app.route('/', require('./views/main'))
app.route('/login', require('./views/login'));
app.route('/signup', require('./views/signup'));
app.route('/about', require('./views/about'));
app.route('/:user', require('./views/main'))
app.route('/:user/:db', require('./views/main'))
app.route('/:user/:db/:id', require('./views/main'))
app.route('/:user/:db/:id/:branch', require('./views/main'))
// app.route('/:username/steps', require('./views/main'))
// app.route('/:username/ingredients', require('./views/main'))
// app.route('/recipes', require('./views/main'))
// app.route('/:username', require('./views/...'))
// app.route('/:username/projects/:id', require('./views/...'))
// app.route('/:username/projects/:id/branches/:projectBranchName', require('./views/...'))

// app.route('/dev-ref', require('./views/dev-ref'))
// app.route('/*', require('./views/404'))

app.use((state, emitter) => {                  // 1.
  emitter.on('navigate', () => {               // 2.
    console.log(`Navigated to ${state.route}`) // 3.
    console.log(`URL Params to ${JSON.stringify(state.params)}`) // 3.

    // // TEMP: route the edit to default on playlists
    // if(state.route == "edit"){
    //   emitter.emit("replaceState", "/edit/playlists")
    // }
    // // TEMP: route the browse to default on playlists
    // if(state.route == "browse"){
    //   emitter.emit("replaceState", "/browse/playlists")
    // }
  })
})

module.exports = app.mount('body')
