const html = require('choo/html');

module.exports = ModalHeader;

function closeAddRecipeModal(state, emit){
    return e => {
        e.preventDefault();
        console.log('close recipe modal');
        emit(state.events.addRecipeModal_close)
    }
}

 function ModalHeader(state, emit){
    return html`
    <div class="w-100 flex flex-row justify-between">
        <h2>Add Recipe Modal</h2>
        <button class="bn f2 bg-light-gray" onclick=${closeAddRecipeModal(state, emit)}>✕</button>
    </div>
    `
}
