var Component = require('choo/component')
var html = require('choo/html')

class Pagination extends Component {
  constructor (id, state, emit) {
    super(id)
    this.local = state.components[id] = {}
  }

  createElement () {
    return html`
      <div class="w-100 h2">
        <ul class="list pl0 flex flex-row items-center justify-center w-100 h-100">
        <li class="f7 mr2 underline">previous</li>
        <li class="f7 mr2 underline">next</li>
        </ul>
      </div>
    `
  }

  update () {
    return true
  }
}

module.exports = Pagination