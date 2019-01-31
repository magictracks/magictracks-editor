const html = require('choo/html');

const CloseModalBtn = require('./closeModalBtn');

module.exports = ModalHeader;

function ModalHeader(state, emit){
    return html`
    <div class="w-100 flex flex-row justify-between">
        <h2>Export! 🚀</h2>
        ${state.cache(CloseModalBtn, "CloseModalBtn", state, emit).render()}
    </div>
    `
}