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

    // TODO: allow edits if authenticated, otherwise, remove buttons for editing
    // if(state.user.authenticated){
    // } else{
    // }

  // show the selected feature(s) 
  function showUserNav(){

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

  // show the selected feature(s) 
  function showUserSelection(){
    let {collection, user} = state.params;

    if(state.params.hasOwnProperty("id")){
      // if an id property exists in params, just show me that one item
      return html`
        <div>specific feature</div>
      `
    } else {
      // otherwise if no id property exists in params, show me the list
      return state[collection].map( item => {
        return html`
          <div class="ba br2 w-100 pt4 pb4 pr3 pl3 flex flex-row items-center h3 mb1">
            <div class="w2 h2 br2 mr4" style="background-color:${item.colors[item.selectedColor]}"></div>
            <p class="f5">${item.title}</p>
          </div>
        `
      })
    }

  }

  return html`
  <body class="w-100 h-100 code lh-copy bg-white ma0 flex flex-column items-center">
    <!-- NavBar Top -->
    ${state.cache(NavBar, "NavBar", state, emit).render()}
    <!-- MAIN -->
    <main class="w-100 h-100 flex flex-column items-center mw8 pa4">
      ${showUserNav()}

      <section class="mt2 w-100 flex flex-column items-start">
      ${showUserSelection()}
      </section>
      
    </main>
  </body>   
  `
}