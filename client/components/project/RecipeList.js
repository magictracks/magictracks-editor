var Component = require('choo/component')
var html = require('choo/html')

const Recipe = require('../recipe/index');

class RecipeList extends Component {
  constructor (id, state, emit) {
    super(id)
    this.state = state;
    this.emit  = emit;
    this.local = state.components[id] = {}
  }

  createElement (_recipeList) {
    console.log(_recipeList);

    return html`
      <div>
        ${
          _recipeList.map( (item, idx) => {
            let {recipe, selectedBranch} = item;
            return new Recipe(this.state, this.emit, recipe, selectedBranch, idx);
          })
        }
      </div>
    `    
  }

  update () {
    return true
  }
}

module.exports = RecipeList