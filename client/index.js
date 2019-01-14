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
app.use(require('./stores/clicks'))

// Views
app.route('/', require('./views/main'))
// app.route('/:username', require('./views/...'))
// app.route('/:username/projects/:id', require('./views/...'))
// app.route('/:username/projects/:id/branches/:projectBranchName', require('./views/...'))

// app.route('/dev-ref', require('./views/dev-ref'))
app.route('/*', require('./views/404'))

module.exports = app.mount('body')
