var Component = require('choo/component')
var html = require('choo/html')

class ProjectHeader extends Component {
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
        emit(state.events.exportModal_open);
      }
  }

  openEditModal(state, emit){
      return e => {
            console.log("opening edit modal", e.currentTarget);            
            emit(state.events.editProjectModal_open);
          }
    }

  openSuggestModal(state, emit){
        return e => {
                console.log("TODO: opening suggest modal", e.currentTarget);            
                // emit(state.events.editProjectModal_open);
            }
        }

  editBtn(state, emit){
        if(state.user.authenticated == true ){
            //  && 
            // state.user.username == state.current.projects.selected.owner ||
            // state.current.projects.selected.collaborators.includes(state.user.username)
            return html`
                <small class="ml2 underline" onclick=${this.openEditModal(state, emit) }>edit</small>
            `
        } else {
            return html`
                <small class="ml2 underline" onclick=${this.openSuggestModal(state, emit) }>suggest</small>
            `
        }
        
    }

  createElement (feature) {
    return html`
        <section class="w-100 mb4 pl2 pr2">
    
            <div class="w-100 br1 br--top pl2 pr2 pt2 pb2 ba" style="border-color:${feature.colors[feature.selectedColor]}">
            <p class="w-100 ma0 f7 flex flex-row justify-start items-center"><small class="f7 mr2">project</small> · <span class="f7 underline mr2 ml2" onclick=${this.download(this.state, this.emit)}>download/share</span> · ${this.editBtn(this.state, this.emit)}</p>
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

module.exports = ProjectHeader