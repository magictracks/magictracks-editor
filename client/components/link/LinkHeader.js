var Component = require('choo/component')
var html = require('choo/html')
const RemoveLinkButton = require('./RemoveLinkButton');

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
            e.preventDefault();
            console.log("opening edit modal", e.currentTarget);   
            const payload = {
                id: e.currentTarget.dataset.id,
                collection: e.currentTarget.dataset.collection,
              }
            emit(state.events.current_setSelected, payload)         
            emit(state.events.editLinkModal_open);
          }
    }
  
  openSuggestModal(state, emit){
      return e => {
        e.preventDefault();
              console.log("TODO: opening suggest modal", e.currentTarget);            
              // emit(state.events.editProjectModal_open);
          }
      }

  editBtn(state, emit, feature){
    if(state.user.authenticated == true){
        return html`
            <small class="ml2 underline" onclick=${this.openEditModal(state, emit) }>edit</small>
        `
    } else {
        return html`
            <small class="ml2 underline" onclick=${this.openSuggestModal(state, emit) }>suggest</small>
        `
    }
      
  }

  createElement (feature, parentId) {

    return html`
    <div class="w-100 br1 br--top items-center flex flex-row justify-between pl2 pr2 pt1 pb1 f7" style="background-color:${feature.colors[feature.selectedColor]}">
    ${this.editBtn(this.state, this.emit, feature)}
    ${new RemoveLinkButton(this.state, this.emit, parentId, feature._id)}    
    </div>
    `
  }

  update () {
    return true
  }
}

module.exports = LinkHeader