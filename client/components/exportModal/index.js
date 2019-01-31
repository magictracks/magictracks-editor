const html = require('choo/html');

const ModalHeader = require('./ModalHeader');

module.exports = ExportModal;


function checkDisplay(state, emit){
    if(state.exportModal.display == true){
        return ""
    } else{
        return "dn"
    }
    
}


function ExportModal(state, emit){

    return html`
    <div id="exportModal" class="w-100 h-100 fixed ${checkDisplay(state, emit)}" style="background-color:rgba(0, 27, 68, 0.5)">
        <div class="w-100 h-100 flex flex-column justify-center items-center pa2">
            <div class="mw7 w-100 h-auto overflow-auto ba br2 bg-light-gray pt2 pb4 pl4 pr4">
                ${ModalHeader(state, emit)}
                <!-- main export modal area -->
                <section>
                    export all the things!
                </section>
                
            </div>
        </div>
    </div>
    `
}