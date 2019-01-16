var html = require('choo/html')

var TITLE = 'client - main'

const NavBar = require('../components/navbar');
const Pagination = require('../components/pagination');

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  function renderProjects(){
    if(state.projects.length > 0){

      return state.projects.map( project => {
        return html`
          <div class="w5 h5 bg-near-white shadow-5 flex flex-column mr2 mt2 mb2">
            <div class="w-100 h-50" style="background-color:${project.colors[project.selectedColor]}"></div>
            <div class="w-100 f7">
              <ul class="pl0 pt1 pb1 pl2 pr2 list">
                <li>${project.title}</li>
                <li>by @${project.owner}</li>
              </ul>
            </div>
          </div>
        `
      })
    } else {
      return html`
        <div>no projects yet</div>
      `
    }
  }

  function renderCurrentProfile(){
    if(state.params.user){
      return html`
      <section class="mt2 w-100 flex flex-column items-start">
      <div>
        <h2>@${state.params.user}</h2>
      </div>
      <ul class="list pl0 flex flex-row">
        <li class="mr4"><a class="link black underline" href="/${state.params.user}/projects">Projects</a></li>
        <li class="mr4"><a class="link black underline" href="/${state.params.user}/recipes">Recipes</a></li>
        <li class="mr4"><a class="link black underline" href="/${state.params.user}/links">Contributed Links</a></li>
      </ul>
    </section>
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

  return html`
    <body class="w-100 h-100 code lh-copy bg-white ma0 flex flex-column items-center">
        <!-- NavBar Top -->
        ${state.cache(NavBar, "NavBar", state, emit).render()}
        <!-- MAIN -->
        <main class="w-100 h-100 flex flex-column items-center mw8 pa4">
          ${renderCurrentProfile()}
          <section class="pt4 pb4 flex flex-row w-100 h-100 flex-wrap justify-start">
            ${renderProjects()}
          </section>
          ${state.cache(Pagination, "Pagination", state, emit).render()}
        </main>
    </body>   
  `
}


/**


<body class="code lh-copy">
      <main class="pa3 cf center">
        <h1>Hello! From Client!</h1>
        <div> 
          ${Object.keys(state.params).map( param => {
            console.log(state.params[String(param)])
            return html`
              <ul>
                <li>
                  ${state.params[String(param)]}
                </li>
              </ul>
            `
          })}
        </div>
      </main>
    </body>

 */