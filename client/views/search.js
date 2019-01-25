var html = require('choo/html')
const NavBar = require('../components/navbar');
const Pagination = require('../components/pagination');

module.exports = view

function view (state, emit) {
  return html`
  <body class="w-100 h-100 code lh-copy bg-white ma0 flex flex-column items-center">
    <!-- NavBar Top -->
    ${state.cache(NavBar, "NavBar", state, emit).render()}
    <!-- MAIN -->
    <main class="w-100 h-100 flex flex-column items-center mw8 pa4">
      
    </main>
  </body>   
  `
}