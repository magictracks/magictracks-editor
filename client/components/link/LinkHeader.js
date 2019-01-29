var Component = require('choo/component')
var html = require('choo/html')

class LinkHeader extends Component {
  constructor (id, state, emit) {
    super(id)
    this.state = state;
    this.emit = emit;
    this.local = state.components[id] = {}
    this.openEditModal = this.openEditModal.bind(this)
    this.openSuggestModal = this.openSuggestModal.bind(this)
    this.editBtn = this.editBtn.bind(this);
  }

  openEditModal(state, emit){
      return e => {
            console.log("opening edit modal", e.currentTarget);            
            // emit(state.events.editLinkModal_open);
          }
    }
  
  openSuggestModal(state, emit){
      return e => {
              console.log("TODO: opening suggest modal", e.currentTarget);            
              // emit(state.events.editProjectModal_open);
          }
      }

  editBtn(state, emit){
      if(state.user.authenticated == true){
          return html`
              <small class="underline" onclick=${this.openEditModal(state, emit) }>edit</small>
          `
      } else {
          return html`
              <small class="underline" onclick=${this.openSuggestModal(state, emit) }>suggest</small>
          `
      }
      
  }

  createElement (feature) {
    return html`
    <div class="w-100 br1 br--top flex flex-row justify-end pa1 f7" style="background-color:${feature.colors[feature.selectedColor]}">
        ${this.editBtn(this.state, this.emit)}
    </div>
    `
  }

  update () {
    return true
  }
}

module.exports = LinkHeader