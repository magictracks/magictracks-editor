const html = require('choo/html');
const LinkForm = require('./LinkForm');
module.exports = AddLinkModal;

function AddLinkModal(id, state, emit){
      function checkDisplay(){
        if(state.addLinkModal.display == true){
          return ""
        } else{
          return "dn"
        }
      }

      function closeLinkModal(e){
        console.log("close link modal")
        emit(state.events.addLinkModal_close)
      }
    
      return html`
          <div id="addLinkModal" class="w-100 h-100 fixed ${checkDisplay()}" style="background-color:rgba(0, 27, 68, 0.5)">
            <div class="w-100 h-100 flex flex-column justify-center items-center">
              <div class="mw7 w-100 h-auto ba br2 bg-light-gray pt2 pb4 pl4 pr4">
                <div class="w-100 flex flex-row justify-between">
                  <h2>Add a new link!</h2>
                  <button class="bn f2 bg-light-gray" onclick=${closeLinkModal}>✕</button>
                </div>
                <section>
                  ${new LinkForm(state, emit)}
                </section>
              </div>
            </div>
          </div>
        `
}