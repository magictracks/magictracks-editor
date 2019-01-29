var Component = require('choo/component')
var html = require('choo/html')

const Link = require('../link/index');

class LinkList extends Component {
  constructor (id, state, emit) {
    super(id)
    this.state = state;
    this.emit  = emit;
    this.local = state.components[id] = {}
  }

  createElement (_linkList) {
    console.log(_linkList);

    return html`
      <div>
        ${
            _linkList.map( (item, idx) => {
            let {link} = item;
            return new Link(this.state, this.emit, link, idx);
          })
        }
      </div>
    `    
  }

  update () {
    return true
  }
}

module.exports = LinkList