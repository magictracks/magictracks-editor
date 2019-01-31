var Component = require('choo/component')
var html = require('choo/html')
const RemoveRecipeButton = require('./RemoveRecipeButton');

class RecipeHeader extends Component {
  constructor (id, state, emit) {
    super(id)
    this.state = state;
    this.emit = emit;
    this.local = state.components[id] = {}
    this.openEditModal = this.openEditModal.bind(this)
    this.openSuggestModal = this.openSuggestModal.bind(this)
    this.editBtn = this.editBtn.bind(this);
    this.download = this.download.bind(this);
  }

  download(state, emit){
      return e => {
        console.log("download/share!")
      }
  }

  openEditModal(state, emit){
      return e => {
            console.log("opening edit modal", e.currentTarget);
            const payload = {
              id: e.currentTarget.dataset.id,
              collection: e.currentTarget.dataset.collection,
            }
            emit(state.events.current_setSelected, payload)
            emit(state.events.editRecipeModal_open);
          }
    }
  
  openSuggestModal(state, emit){
      return e => {
            console.log("TODO: opening suggest modal", e.currentTarget);            
            // emit(state.events.editProjectModal_open);
          }
      }

  editBtn(state, emit, feature){
      if(state.user.authenticated == true){
          return html`
              <small class="f7 ml2 underline" data-collection="${feature.featureType}" data-id=${feature._id} onclick=${this.openEditModal(state, emit) }>edit</small>
          `
      } else {
          return html`
              <small class="ml2 f7 underline" onclick=${this.openSuggestModal(state, emit) }>suggest</small>
          `
      }
      
  }

  createElement (feature, _parentId) {

    return html`
        <section class="mb4">
        <div class="w-100 br1 br--top pl2 pr2 pt2 pb2 ba" style="border-color:${feature.colors[feature.selectedColor]}">
          <p class="w-100 ma0 f7 flex flex-row justify-between items-center">
            <div><small class="f7 mr2">recipe</small> · <span class="f7 underline mr2 ml2" onclick=${this.download(this.state, this.emit)}>download/share</span> · ${this.editBtn(this.state, this.emit, feature)}</div>
            <div>${new RemoveRecipeButton(this.state, this.emit, _parentId, feature._id)}</div>
          </p>
        </div>
        <h2 class="pl2 pr2">
          ${feature.title}
          <small class="f7"> (${feature.selectedBranch})</small>
        </h2>
        <p class="pl2 pr2">${feature.description}</p>
        <ul class="list pl0"></ul>
        </section>
    `
  }

  update () {
    return true
  }
}

module.exports = RecipeHeader