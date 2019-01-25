var Component = require('choo/component')
var html = require('choo/html')

class NavbarSearch extends Component {
  constructor () {
    super()
    // this.local = state.components[id] = {}
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(state, emit){
    return e => {
      console.log(e.currentTarget.value);

      e.currentTarget.childNodes.forEach( item => { 
        if(item.value == e.currentTarget.value){
            item.selected = "selected"
        } else{
            item.selected = ""
        }
      });

      emit(state.events.search_triggerSearch, {collection: e.currentTarget.value})
    }
    
  }

  createElement (state, emit) {
    return html`
      <div class="w-100 h-100 flex flex-row">
        <!-- input search -->
        <div class="bg-moon-gray w-100 h-100 br1 br--left pr1">
          <input class="w-100 h-100 bn br1 br--left pl2 pr2 bg-moon-gray" type="text" placeholder="🔎 Search...">
        </div>
        <!-- select option -->
        <div class="bg-moon-gray h-100 w5 br1 br--right">
          <select class="h-100 w-100 bn br1 br--right" id="filterSearch" name="filterSearch" onchange=${this.handleChange(state, emit) } value="${state.search.collection}">
            <option value="projects">Projects</option>
            <option value="recipes">Recipes</option>
            <option value="links">Links</option>
            <option value="users">Users</option>
          </select>
        </div>
      </div>
    `
  }

  update () {
    return true
  }
}

module.exports = NavbarSearch