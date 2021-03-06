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
app.use(require('./stores/editProjectModal'))
app.use(require('./stores/editRecipeModal'))
app.use(require('./stores/editLinkModal'))
app.use(require('./stores/current'))
app.use(require('./stores/links'))
app.use(require('./stores/search'))
app.use(require('./stores/user'))
app.use(require('./stores/exportModal'))


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


module.exports = app.mount('body')
