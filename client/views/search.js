var html = require('choo/html')
const NavBar = require('../components/navbar');
const navbar = new NavBar();
const Pagination = require('../components/pagination');

module.exports = view

function view (state, emit) {
  return html`
  <body class="w-100 h-100 code lh-copy bg-white ma0 flex flex-column items-center">
    <!-- NavBar Top -->
    ${navbar.render(state, emit)}
    <!-- MAIN -->
    <main class="w-100 h-100 flex flex-column items-center mw8 pa4">
      
    </main>
  </body>   
  `
}