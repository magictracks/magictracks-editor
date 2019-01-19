var Component = require('choo/component')
var html = require('choo/html')

// class UserNav extends Component {
//   constructor (id, state, emit) {
//     super(id)
//     this.local = state.components[id] = {}
//   }

//   createElement () {
//     return html`
//       <div>
//       </div>
//     `
//   }

//   update () {
//     return true
//   }
// }

// show the selected feature(s) 
function UserNav(id, state, emit){

  function checkPath(_path){
    if(_path == state.params.collection){
      return 'underline'
    } else{
      return ''
    }
  }

  if(!state.params.hasOwnProperty("id")){
    // if an id property exists in params, just show me that one item
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

}

module.exports = UserNav