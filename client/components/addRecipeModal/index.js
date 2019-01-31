const html = require('choo/html');

const ModalHeader = require("./ModalHeader");
const RecipeSelectModule = require("./RecipeSelectModule");
const BranchActionModule = require("./BranchActionModule");
const ModalFooter = require("./ModalFooter");

module.exports = AddRecipeModal;

function AddRecipeModal(id, state, emit){

    function closeAddRecipeModal(state, emit){
        return e => {
            console.log('close recipe modal');
            emit(state.events.addRecipeModal_close)
        }
    }
  
    function checkDisplay(){
      if(state.addRecipeModal.display == true){
        return ""
      } else{
        return "dn"
      }
    }


    return html`
      <div id="addRecipeModal" class="w-100 h-100 fixed ${checkDisplay()}" style="background-color:rgba(0, 27, 68, 0.5)">
        <div class="w-100 h-100 flex flex-column justify-center items-center">
          <div class="mw7 w-100 h-auto ba br2 bg-light-gray pt2 pb4 pl4 pr4">
            ${ModalHeader(state, emit)}
            ${RecipeSelectModule(state, emit)}
            ${ModalFooter(state, emit)}
          </div>
        </div>
      </div>
    `
  }