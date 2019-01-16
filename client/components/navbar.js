var Component = require('choo/component')
var html = require('choo/html')

class Navbar extends Component {
  constructor (id, state, emit) {
    super(id)
    this.state = state;
    this.emit = emit;
    this.local = state.components[id] = {}
    this.checkAuthStatus = this.checkAuthStatus.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  checkAuthStatus(){
    if(this.state.user.authenticated == true){
      return html`
        <a class="link black cursor" onclick=${() => {this.emit("pushState", `/${this.state.user.username}/projects`) }}>@${this.state.user.username}</a>
      `
    } else{
      return html`
        <a class="link black" href="/login">Login</a>
      `
    }
  }

  handleChange(e){
    console.log(e.currentTarget.value);

    e.currentTarget.childNodes.forEach( item => { 
      if(item.value == e.currentTarget.value){
          item.selected = "selected"
      } else{
          item.selected = ""
      }
    });


    this.emit(this.state.events.search_triggerSearch, {collection: e.currentTarget.value})
  }


  createElement () {

    return html`
      <nav class="w-100 h3 shadow-1 bg-light-gray flex flex-row justify-between">
          <ul class="w-10 list flex flex-row pl0 items-center justify-start pl4">
            <li class="f6 pr4 w-20"> <a class="link black" href="/">Magic Tracks</a></li>
          </ul>
          <ul class="w-80 list flex flex-row pl2 justify-start items-center pr4">
          <li class="f6 pr4 flex flex-row h-100 w-80">
              <div class="bg-moon-gray w-100 h-100 br1 br--left pr1">
                <input class="w-100 h-100 bn br1 br--left pl2 pr2 bg-moon-gray" type="text" placeholder="🔎 Search...">
              </div>
              <div class="bg-moon-gray h-100 w5 br1 br--right">
                <select class="h-100 w-100 bn br1 br--right" id="filterSearch" name="filterSearch" onchange=${this.handleChange} value="${this.state.search.collection}">
                  <option value="projects">Projects</option>
                  <option value="recipes">Recipes</option>
                  <option value="links">Links</option>
                  <option value="users">Users</option>
                </select>
              </div>
            </li>
            <li class="f6 mr4">${this.checkAuthStatus()}</li>
          </ul>
          <ul class="w-10 list flex flex-row pl2 justify-end items-center pr4">
            <li class="f6 mr4"> <a class="link black" href="/about">About</a></li>
            <li class="f6 pr2"> <a class="link black" href="/settings">Settings</a></li>
          </ul>
      </nav>
    `
  }

  update () {
    return true
  }
}

module.exports = Navbar