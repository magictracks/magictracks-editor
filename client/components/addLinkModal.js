var Component = require('choo/component')
var html = require('choo/html')

// class AddLinkModal extends Component {
//   constructor (id, state, emit) {
//     super(id)
//     this.local = state.components[id] = {}
//   }

//   createElement () {
//     return html`
//       <div>
//       </div>
//     `
//   }

//   update () {
//     return true
//   }
// }

function AddLinkModal(id, state, emit){
  function closeLinkModal(e){
    console.log("close link modal")
    emit(state.events.addLinkModal_close)
  }

  function submitForm(e){
    e.preventDefault();
    let formData = new FormData(e.currentTarget);

    let payload ={
      linkData:{
        url: formData.get("url")
      },
      recipeId: state.addLinkModal.selectRecipeId,
      recipeBranchName: state.addLinkModal.selectRecipeBranchName
    }

    console.log("im the payload in addlinkmodal",payload)

    emit(state.events.links_createAndPush, payload);
    emit(state.events.addLinkModal_close);
  }

  function checkDisplay(){
    if(state.addLinkModal.display == true){
      return ""
    } else{
      return "dn"
    }
  }

  return html`
      <div id="addLinkModal" class="w-100 h-100 fixed ${checkDisplay()}" style="background-color:rgba(0, 27, 68, 0.5)">
        <div class="w-100 h-100 flex flex-column justify-center items-center">
          <div class="mw7 w-100 h-auto ba br2 bg-light-gray pt2 pb4 pl4 pr4">
            <div class="w-100 flex flex-row justify-between">
              <h2>New Link Modal</h2>
              <button class="bn f2 bg-light-gray" onclick=${closeLinkModal}>✕</button>
            </div>
            <section>
              <form name="addLinkForm" id="addLinkForm" onsubmit=${submitForm}>
              <fieldset class="w-100 mb2">
                <legend class="br-pill ba pl1 pr1">URL</legend>
                  <input class="w-100 bg-near-white bn br2 pa2" type="text" name="url">
              </fieldset>
              <fieldset class="w-100 mb2">
                <legend class="br-pill ba pl1 pr1">title</legend>
                  <input class="w-100 bg-near-white bn br2 pa2" type="text" name="title">
              </fieldset>
              <fieldset class="w-100 mb2">
                <legend class="br-pill ba pl1 pr1">description</legend>
                  <input class="w-100 bg-near-white bn br2 pa2" type="text" name="description">
              </fieldset>
              <input type="submit" value="save">
              </form>
            </section>
          </div>
        </div>
      </div>
    `


}

module.exports = AddLinkModal