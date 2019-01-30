var html = require('choo/html')

const CloseModalBtn = require('./closeModalBtn');

module.exports = EditLinkModal;

function checkDisplay(state, emit){
    if(state.editLinkModal.display == true){
        return ""
    } else{
        return "dn"
    }
}

function EditLinkModal(state, emit){
    const {selected, id, branch} = state.current.links;

    return html`
    <div id="editLinkModal" class="w-100 h-100 fixed ${checkDisplay(state, emit)}" style="background-color:rgba(0, 27, 68, 0.5)">
        <div class="w-100 h-100 flex flex-column justify-center items-center pa2">
            <div class="mw7 w-100 h-auto overflow-auto ba br2 bg-light-gray pt2 pb4 pl4 pr4">
                <div class="w-100 flex flex-row justify-between">
                    <h2>Edit Link</h2>
                    ${state.cache(CloseModalBtn, "CloseLinkModalBtn", state, emit).render()}
                </div>
                <!-- main project modal area -->
                <section>
                
                </section>
            </div>
        </div>
    </div>
    `
}


  