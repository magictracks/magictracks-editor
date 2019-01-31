var Component = require('choo/component')
var html = require('choo/html')

class UserNav extends Component {
  constructor (id, state, emit) {
    super(id)
    this.state = state;
    this.emit = emit;
    // this.local = state.components[id] = {}
    this.checkPath = this.checkPath.bind(this);
  }

  checkPath(_path, collection){
    if(_path == collection){
      return 'underline'
    } else{
      return ''
    }
  }

  createElement () {
    const {user, collection} = this.state.params;

    if(!this.state.params.hasOwnProperty('id')){
      // if an id property exists in params, just show me that one item
      return html`
      <section class="mt2 w-100 flex flex-column items-start">
        <div>
          <h2>@${user}</h2>
          <p class="f7">${'#'} <a href="#">Followers</a> · ${'#'} <a href="#">Following</a></p>
        </div>
        <ul class="list pl0 flex flex-row">
          <li class="mr4"><a class="link black ${this.checkPath('projects', collection)}" href="/${user}/projects">Projects</a></li>
          <li class="mr4"><a class="link black ${this.checkPath('recipes', collection)}" href="/${user}/recipes">Recipes</a></li>
          <li class="mr4"><a class="link black ${this.checkPath('links', collection)}" href="/${user}/links">Contributed Links</a></li>
        </ul>
      </section>
    `
    } else {
      return html`<div></div>`
    }
  }

  update () {
    return true
  }
}

module.exports = UserNav