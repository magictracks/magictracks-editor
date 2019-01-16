var Component = require('choo/component')
var html = require('choo/html')

class Navbar extends Component {
  constructor (id, state, emit) {
    super(id)
    this.state = state;
    this.emit = emit;
    this.local = state.components[id] = {}
    this.checkAuthStatus = this.checkAuthStatus.bind(this);
  }

  checkAuthStatus(){
    if(this.state.user.authenticated == true){
      return html`
        <a class="link black" href="/${this.state.user.username}/projects">${this.state.user.username}</a>
      `
    } else{
      return html`
        <a class="link black" href="/login">Login</a>
      `
    }
  }

  createElement () {
    return html`
      <nav class="w-100 h3 shadow-1 flex flex-row justify-between bg-light-gray">
        <ul class="w-70 list flex flex-row pl0 items-center justify-start">
          <li class="f6 pl2 pr4"> <a class="link black" href="/">Magic Recipes</a></li>
          <div class="bg-moon-gray w5 h-100 br1 br--left pr1">
            <input class="w-100 h-100 bn br1 br--left pl2 pr2 bg-moon-gray" type="text" placeholder="🔎 Search...">
          </div>
          <div class="bg-moon-gray w4 h-100 br1 br--right">
            <select class="h-100 w-100" name="filterSearch">
              <option value="recipe">Recipes</option>
              <option value="step">Steps</option>
              <option value="ingredient">Ingredients</option>
              <option value="user">Users</option>
            </select>
          </div>
        </ul>
        <ul class="w-30 list flex flex-row pl0 justify-end items-center">
          <li class="f6 pr2">${this.checkAuthStatus()}</li>
          <li class="f6 pr2"> <a class="link black" href="/">About</a></li>
          <li class="f6 pr2"> <a class="link black" href="/">Settings</a></li>
        </ul>
      </nav>
    `
  }

  update () {
    return true
  }
}

module.exports = Navbar