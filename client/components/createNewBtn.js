var Component = require('choo/component')
var html = require('choo/html')

class CreateNewBtn extends Component {
  constructor (id, state, emit) {
    super(id)
    this.state = state;
    this.emit = emit;
    // this.local = state.components[id] = {}
    this.triggerAdd = this.triggerAdd.bind(this);
  }

  triggerAdd(state, emit){
    const {collection} = state.params;
    return e => {
      console.log("add new!")
      let createFunction = `${collection}_create`;
      let feat = 'New ';
      let payload = {};

      switch(collection){
        case 'projects':
          feat+= 'Project!';
          payload['projectData'] = {'title': feat};
          break;
        case 'recipes':
          feat+= 'Recipe!';
          payload['recipeData'] = {'title': feat};
          break;
      }

      emit(state.events[createFunction], payload);
    }
  }

  createElement () {
    return html`
      <div onclick=${this.triggerAdd(this.state, this.emit)} class="bn bg-light-gray br2 w-100 pt4 pb4 pr3 pl3 flex flex-row items-center h3 mb1">
        <button class="w2 h2 br2 mr4 bg-white f4 bn ma0 pb1">+</button>
        <p class="f5">Add New</p>
      </div>
      `
  }

  update () {
    return true
  }
}

module.exports = CreateNewBtn


// function addNewFeature() {
//   const {
//     collection
//   } = state.params;

//   function triggerAdd(e) {
//     console.log("add new!")
//     let createFunction = `${collection}_create`;
//     let feat;
//     let payload;

//     if (collection == "projects") {
//       feat = "New Project!";
//       payload = {
//         "projectData": {
//           "title": feat
//         }
//       };
//     } else if (collection == "recipes") {
//       feat = "New Recipe!";
//       payload = {
//         "recipeData": {
//           "title": feat
//         }
//       };
//     } else if (collection == "links") {
//       feat = "New Recipe!";
//       payload = {
//         "linkData": {
//           "title": feat
//         }
//       };
//     }

//     emit(state.events[createFunction], payload);
//   }

  
// }