var Component = require('choo/component')
var html = require('choo/html')




function AddRecipeButton(state, emit, parentId, branchName){
  
  function openAddRecipeModal(e){
    console.log('open recipe modal');
    const {projectid, projectbranch} = e.currentTarget.dataset
  
    emit(state.events.addRecipeModal_selectProjectId, projectid)
    emit(state.events.addRecipeModal_selectProjectBranchName, projectbranch)
    emit(state.events.addRecipeModal_open)
  }

    return html`
      <button class="w-100 h1 bg-near-white br2 pointer f7 bn light-silver mt2 mb2"
      data-projectid="${parentId}"
      data-projectbranch="${branchName}"
      onclick=${openAddRecipeModal}>add recipe</button>
    `
}

module.exports = AddRecipeButton