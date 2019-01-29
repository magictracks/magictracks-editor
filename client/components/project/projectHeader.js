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
        <section class="mb4">
        <p class="w-100 flex flex-row justify-start items-center"><small class="f7">project</small> · ${this.editBtn(this.state, this.emit)}</p>
        <h2>${feature.title}
        <small class="f7"> (${feature.selectedBranch})</small>
        </h2>
        <p class="f7">${'#'} High-Fives · ${'#'} Forks · ${'#'} Followers · <span onclick=${this.download(this.state, this.emit)}>Download/Share</span> </p>
        <p>${feature.description}</p>
        <ul class="list pl0"></ul>
        </section>
    `
  }

  update () {
    return true
  }
}

module.exports = ProjectHeader