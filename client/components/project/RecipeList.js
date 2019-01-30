var Component = require('choo/component')
var html = require('choo/html')
const Sortable = require('sortablejs');

const Recipe = require('../recipe/index');

class RecipeList extends Component {
  constructor (id, state, emit) {
    super(id)
    this.state = state;
    this.emit  = emit;
    this.local = state.components[id] = {}
    this.makeSortable = this.makeSortable.bind(this);
  }

  makeSortable(state, emit, _newList){
    let newList, sortableList;
    sortableList = Sortable.create(_newList, {
      onEnd: function(evt){
        console.log("sortable", evt.newIndex);
        // console.log("🌮🌮🌮",evt.clone.dataset.parentid, evt.clone.dataset.parentdb);

        const payload = {
          parentBranchId: evt.clone.dataset.parentid,
          parentCollection: evt.clone.dataset.parentdb,
          recipeId: evt.clone.dataset.id,
          newRecipePosition: evt.newIndex
        }

        emit(state.events.projects_reorderRecipes, payload)

        // emit("db:selectedFeature:reorder", evt.clone.dataset.parentid, evt.clone.dataset.parentdb,  evt.clone.dataset.featureid, evt.newIndex)

      }
    });

    return sortableList.el;
  }

  createElement (_recipeList, _parentBranchId) {
    let newList;

    newList = html`
      <div>
        ${
          _recipeList.map( (item, idx) => {
            let {recipe, selectedBranch} = item;
            return new Recipe(this.state, this.emit, recipe, selectedBranch, idx, _parentBranchId);
          })
        }
      </div>
    `    

    return this.makeSortable(this.state, this.emit, newList);
  }


  update () {
    return true
  }
}

module.exports = RecipeList