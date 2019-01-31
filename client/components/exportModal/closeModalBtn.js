var Component = require('choo/component')
var html = require('choo/html')

class CloseModalBtn extends Component {
  constructor (id, state, emit) {
    super(id)
    this.state = state;
    this.emit = emit;
    this.local = state.components[id] = {}
    this.closeModal = this.closeModal.bind(this);
  }
  
  closeModal(state, emit){
      return e => {
        console.log('close export modal');
        emit(state.events.exportModal_close)
      }
    
  }

  createElement () {
    return html`
    <button class="bn f2 bg-light-gray" onclick=${this.closeModal(this.state, this.emit)}>✕</button>
    `
  }

  update () {
    return false
  }
}

module.exports = CloseModalBtn