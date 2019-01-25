var html = require('choo/html')
var LoginForm = require('../components/LoginForm')
var NavBar = require('../components/navbar')

module.exports = view

function view (state, emit) {
  return html`
  <body class="w-100 h-100 code lh-copy bg-white ma0 flex flex-column items-center">
    <!-- NavBar Top -->
    ${state.cache(NavBar, "NavBar", state, emit).render()}
    <main class="w-100 h-100 flex flex-column items-center mw8 justify-center">
    <!-- login -->
    <section class="mw6 w-100 h-100 pa2 flex flex-column justify-center items-center mt4">
      <h2>Login</h2>
      <p class="w-100">Log in to your account with your email & password - we don't store your password!</p>
      ${state.cache(LoginForm, "LoginForm", state, emit)}
      <p class="w-100 f6">Don't have an account? <a href="/signup">Create an account here</a>.</p>
      <p class="w-100 f6">Back <a href="/">Home</a>.</p>
    </section>
    </main>
    </body>
  `
}