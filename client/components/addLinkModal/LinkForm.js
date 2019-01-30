const html = require('choo/html');

module.exports = LinkForm;

function urlInput(state, emit){
    return html`
    <fieldset class="w-100 mb2">
        <legend class="br-pill ba pl1 pr1">URL</legend>
        <input class="w-100 bg-near-white bn br2 pa2" type="text" name="url">
    </fieldset>
    `
}

function titleInput(state, emit){
    return html`
    <fieldset class="w-100 mb2">
        <legend class="br-pill ba pl1 pr1">title</legend>
        <input class="w-100 bg-near-white bn br2 pa2" type="text" name="title">
    </fieldset>
    `
}

function descriptionInput(state, emit){
    return html`
    <fieldset class="w-100 mb2">
        <legend class="br-pill ba pl1 pr1">description</legend>
        <input class="w-100 bg-near-white bn br2 pa2" type="text" name="description">
    </fieldset>
    `
}

function submitForm(state, emit){
    return e => {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);

        let payload ={
            linkData:{
            url: formData.get("url")
            },
            recipeId: state.addLinkModal.selectRecipeId,
            recipeBranchName: state.addLinkModal.selectRecipeBranchName
        }

        console.log("im the payload in addlinkmodal", payload)

        emit(state.events.links_createAndPush, payload);
        emit(state.events.addLinkModal_close);
    }
}

function LinkForm(state, emit){
    
    return html`
        <form name="addLinkForm" id="addLinkForm" onsubmit=${submitForm(state, emit)}>
            ${urlInput(state, emit)}
            <!-- TODO: add in title and description if deemed necessary -->
            <input type="submit" value="save">
        </form>
    `
}