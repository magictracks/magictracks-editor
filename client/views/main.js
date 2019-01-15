var html = require('choo/html')

var TITLE = 'client - main'

const NavBar = require('../components/navbar');
const Pagination = require('../components/pagination');

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  function renderRecipes(){
    if(state.recipes.length > 0){
      console.log(state.recipes)
      return state.recipes.map( recipe => {
        return html`
          <div class="w5 h5 bg-near-white shadow-1 flex flex-column grow ml4 mr4 mt2 mb2">
            <div class="w-100 h-50" style="background-color:${recipe.colors[recipe.selectedColor]}"></div>
            <div class="w-100 f7">
              <ul class="pl0 pt1 pb1 pl2 pr2 list">
                <li>${recipe.title}</li>
                <li>by @${recipe.owner}</li>
              </ul>
            </div>
          </div>
        `
      })
    } else {
      return html`
        <div>no recipes yet</div>
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
            ${renderRecipes()}
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