const html = require('choo/html');
const BranchActionModule = require("./BranchActionModule");

module.exports = ModalFooter;

function closeAddRecipeModal(state, emit){
    return e => {
        console.log('close recipe modal');
        emit(state.events.addRecipeModal_close)
    }
}

function closeModalBtn(state, emit){
    return html`
        <button class="br2 bn bg-light-red h3" onclick=${closeAddRecipeModal(state, emit)}>cancel</button>
    `
}

function ModalFooter(state, emit){
    return html`
    <section class="mt2 flex flex-row justify-between items-center">
        ${closeModalBtn(state, emit)}
        <div class="h3 flex flex-column justify-center">
        ${BranchActionModule(state, emit)}
        </div>
    </section>
    `
}