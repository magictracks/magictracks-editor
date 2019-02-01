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
                <section class="w-100">
                    <!-- URL -->
                    <fieldset class="w-100">
                        <legend>URL</legend>
                        <textarea class="br2 bn pa2 pl0 ws-normal w-100" style="resize:none;">
                            ${window.location.href.trim()}
                        </textarea>
                    </fieldset>
                    <!-- JSON data -->
                    <fieldset class="w-100">
                        <legend>JSON</legend>
                        <textarea class="br2 bn pa2 pl0 ws-normal h4 w-100" style="resize:none;">
                            ${JSON.stringify(state.current[state.params.collection].selected).trim()}
                        </textarea>
                    </fieldset>
                </section>
            </div>
        </div>
    </div>
    `
}