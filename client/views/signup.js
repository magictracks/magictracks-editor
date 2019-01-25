var html = require('choo/html')
var SignupForm = require('../components/SignupForm')
var NavBar = require('../components/navbar')
const navbar = new NavBar();

module.exports = view

function view (state, emit) {
  return html`
  <body class="w-100 h-100 code lh-copy bg-white ma0 flex flex-column items-center">
      <!-- NavBar Top -->
      ${navbar.render(state, emit)}
      <!-- Sign up -->
    <main class="w-100 h-100 flex flex-column items-center mw8 justify-center">
      <section class="mw6 pa2 flex flex-column justify-center items-center mt4">
        <h2>Create an Account</h2>
        <p class="w-100">Start using Magic Tracks by creating an account with your email & password.</p>
        ${state.cache(SignupForm, "SignupForm", state, emit)}
        <p class="w-100 f6">Already have an account? <a href="/login">Log in here</a>.</p>
        <p class="w-100 f6">Back <a href="/">Home</a>.</p>
      </section>
    </main>
    </body>
  `
}