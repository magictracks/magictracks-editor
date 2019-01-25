var Component = require('choo/component')
var html = require('choo/html')


class NavbarLoginBtn extends Component {
  constructor () {
    super()
    
    this.navigate = this.navigate.bind(this);
    // this.local = state.components[id] = {}
  }

  createElement (state, emit) {
    
    if(state.user.authenticated == true){
      let pathway = `/${state.user.username}/projects`

      return html`
        <a class="link black cursor" onclick=${this.navigate(emit, pathway)}> @${state.user.username}</a>
      `

    } else {
      return html`
      <a class="cursor link black" href="/login">Login</a>
      `
    }
    
  }

  navigate(emit, pathway){
    return e => {
      emit("pushState", pathway);
    }
  }


  update () {
    return true
  }
}

module.exports = NavbarLoginBtn