var html = require('choo/html')
const NavBar = require('../components/navbar');
const Pagination = require('../components/pagination');

module.exports = view

function view (state, emit) {

  function renderCurrentProfile(){
    if(state.params.user){
      return html`
      
      `
    } else{
      return html`
      <section class="mt2 w-100 flex flex-column items-start">
        <div>
          <h2>Browse</h2>
        </div>
        <ul class="list pl0 flex flex-row">
          <li class="mr4"><a class="link black underline" href="/projects">Projects</a></li>
          <li class="mr4"><a class="link black underline" href="/recipes">Recipes</a></li>
          <li class="mr4"><a class="link black underline" href="/links">Links</a></li>
        </ul>
      </section>
      `
    }
  }

  function showUserPage(){
    // TODO: allow edits if authenticated, otherwise, remove buttons for editing
    // if(state.user.authenticated){
    // } else{
    // }

    function checkPath(_path){
      if(_path == state.params.collection){
        return 'underline'
      } else{
        return ''
      }
      
    }

    return html`
    <section class="mt2 w-100 flex flex-column items-start">
      <div>
        <h2>@${state.params.user}</h2>
        <p class="f7">${'#'} <a href="#">Followers</a> · ${'#'} <a href="#">Following</a></p>
      </div>
      <ul class="list pl0 flex flex-row">
        <li class="mr4"><a class="link black ${checkPath('projects')}" href="/${state.params.user}/projects">Projects</a></li>
        <li class="mr4"><a class="link black ${checkPath('recipes')}" href="/${state.params.user}/recipes">Recipes</a></li>
        <li class="mr4"><a class="link black ${checkPath('links')}" href="/${state.params.user}/links">Contributed Links</a></li>
      </ul>
    </section>
    `


  }

  return html`
  <body class="w-100 h-100 code lh-copy bg-white ma0 flex flex-column items-center">
    <!-- NavBar Top -->
    ${state.cache(NavBar, "NavBar", state, emit).render()}
    <!-- MAIN -->
    <main class="w-100 h-100 flex flex-column items-center mw8 pa4">
      ${showUserPage()}
    </main>
  </body>   
  `
}