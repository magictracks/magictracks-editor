var Component = require('choo/component')
var html = require('choo/html')


function AddLinkButton(state, emit, parentId, branchName){
    function openAddLinkModal(e){
      console.log("open link modal")
      const{recipeid, recipebranch} = e.currentTarget.dataset
      console.log(recipeid, recipebranch)

      emit(state.events.addLinkModal_selectRecipeId, recipeid)
      emit(state.events.addLinkModal_selectRecipeBranchName, recipebranch)
      emit(state.events.addLinkModal_open)
    }

    return html`
      <button class="w-100 h1 bg-near-white br2 pointer f7 bn light-silver"
      data-recipeid="${parentId}"
      data-recipebranch="${branchName}"
      onclick=${openAddLinkModal}>add link</button>
    `
}

module.exports = AddLinkButton