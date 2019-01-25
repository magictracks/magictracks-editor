const Component = require('choo/component')
const html = require('choo/html')

const NavbarLoginBtn = require('./navbar/navbarLoginBtn');
const NavbarSearch = require('./navbar/navbarSearch');

const navbarLoginBtn = new NavbarLoginBtn();
const navbarSearch = new NavbarSearch();

class Navbar extends Component {
  constructor () {
    super()
    // this.local = state.components[id] = {}
  }

  createElement (state, emit) {

    return html`
      <nav class="w-100 h3 shadow-1 bg-light-gray flex flex-row justify-between">
          <ul class="w-10 list flex flex-row pl0 items-center justify-start pl4">
            <li class="f6 pr4 w-20"> <a class="link black" href="/">Magic Tracks</a></li>
          </ul>
          <ul class="w-80 list flex flex-row pl2 justify-start items-center pr4">
            <li class="f6 pr4 h-100 w-80">${navbarSearch.render(state, emit)}</li>
            <li class="cursor f6 mr4">${navbarLoginBtn.render(state,emit)}</li>
          </ul>
          <ul class="w-10 list flex flex-row pl2 justify-end items-center pr4">
            <li class="cursor f6 mr4"> <a class="link black" href="/about">About</a></li>
            <li class="cursor f6 pr2"> <a class="link black" href="/settings">Settings</a></li>
          </ul>
      </nav>
    `
  }

  update () {
    return true
  }
}

module.exports = Navbar