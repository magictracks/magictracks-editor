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
          <div class="w5 h5 bg-near-white shadow-5 flex flex-column ml4 mr4 mt2 mb2">
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

  return html`
    <body class="w-100 h-100 code lh-copy bg-white ma0 flex flex-column items-center">
        <!-- NavBar Top -->
        ${state.cache(NavBar, "NavBar", state, emit).render()}
        <!-- MAIN -->
        <main class="w-100 h-100 flex flex-column items-center mw8">
          <section class="pl4 pr4 pt4 pb4 flex flex-row w-100 h-100 flex-wrap justify-between">
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