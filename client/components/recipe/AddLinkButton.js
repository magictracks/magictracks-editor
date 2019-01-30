var Component = require('choo/component')
var html = require('choo/html')


function AddLinkButton(state, emit, _recipeId, _branchName){
    
  function openAddLinkModal(e){
      console.log("open link modal", e.currentTarget.dataset)
      // const{_recipeid, _recipebranch} = e.currentTarget.dataset
      // console.log(recipeid, recipebranch)

      emit(state.events.addLinkModal_selectRecipeId, _recipeId)
      emit(state.events.addLinkModal_selectRecipeBranchName, _branchName)
      emit(state.events.addLinkModal_open)
    }

    if(state.user.authenticated == true){
      return html`
      <button class="w-100 h2 bg-near-white br2 pointer f7 bn light-silver hover-bg-purple"
      data-recipeid="${_recipeId}"
      data-branchname="${_branchName}"
      onclick=${openAddLinkModal}>add link</button>
    `
    }
    
}

module.exports = AddLinkButton