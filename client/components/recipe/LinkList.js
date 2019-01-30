var Component = require('choo/component')
var html = require('choo/html')

const Link = require('../link/index');
const Sortable = require('sortablejs');

class LinkList extends Component {
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
          linkId: evt.clone.dataset.id,
          newLinkPosition: evt.newIndex
        }

        emit(state.events.recipes_reorderLinks, payload)

        // emit("db:selectedFeature:reorder", evt.clone.dataset.parentid, evt.clone.dataset.parentdb,  evt.clone.dataset.featureid, evt.newIndex)

      }
    });

    return sortableList.el;
  }


  createElement (_linkList, _parentBranchId) {
    let newList;

    newList = html`
      <div>
        ${
            _linkList.map( (item, idx) => {
            let {link} = item;
            return new Link(this.state, this.emit, link, idx, _parentBranchId);
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

module.exports = LinkList