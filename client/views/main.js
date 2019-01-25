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
          <div class="fl w-third-ns pa2">
          <a class="link black" href="/${project.owner}/projects/${project._id}/${project.selectedBranch}">
          <div class="w5 h5 bg-near-white shadow-5 flex flex-column mt2 mb2">
            <div class="w-100 h-50" style="background-color:${project.colors[project.selectedColor]}"></div>
            <div class="w-100 f7">
              <ul class="pl0 pt1 pb1 pl2 pr2 list">
                <li>${project.title}</li>
                <li>by @${project.owner}</li>
              </ul>
            </div>
          </div>
          </a>
          </div>
        `
      })
    } else {
      return html`
        <div>no projects yet</div>
      `
    }
  }

  function checkUser(){
    if(state.user.authenticated == true){
      return `/${state.user.username}/projects`
    } else{
      return `/login`
    }
  }

  return html`
    <body class="w-100 h-100 code lh-copy bg-white ma0 flex flex-column items-center">
        <!-- NavBar Top -->
        ${state.cache(NavBar, "NavBar", state, emit).render()}
        <!-- MAIN -->
        <main class="w-100 h-100 flex flex-column items-center mw8 pa4">
          <h2 class="f2">Welcome to the 🌈 Magic Tracks ✨ </h2>
          <h3 class="f3">A friendly pick-and-mix tutorial maker</h3>
          <h4 class="f4">Get started by <a class="link underline black" href=${checkUser()}">making a project</a> or <a class="link underline">browsing</a> what your friends are brewing up across the world 🌍.</h4>
          
          <section class="pt4 pb4 w-100 h-100">
            ${renderProjects()}
          </section>

          <section class="pt4 pb4 w-100">
            <p>Need some help getting started? Check out our "how-to" video on the <a class="link underline black" href="/about">about page</a>.</p>
          </section>
        </main>
    </body>   
  `
}


/**

${renderCurrentProfile()}
<section class="pt4 pb4 flex flex-row w-100 h-100 flex-wrap justify-start">
  ${renderProjects()}
</section>
${state.cache(Pagination, "Pagination", state, emit).render()}

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