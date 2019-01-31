var Component = require('choo/component')
var html = require('choo/html')




function AddRecipeButton(state, emit, _projectId, _branchName){
  
  function openAddRecipeModal(e){
    console.log('open recipe modal');
    // const {projectid, projectbranch} = e.currentTarget.dataset
  
    
    emit(state.events.addRecipeModal_selectProjectId, _projectId) // TOOD: remove is we get the project id from the current.js store
    emit(state.events.addRecipeModal_selectProjectBranchName, _branchName) // TOOD: remove is we get the project id from the current.js store

    // GET Only recipes owned by user
    emit(state.events.recipes_find, {"query": {"owner":state.user.username}})

    emit(state.events.addRecipeModal_open)
  }

    return html`
      <button class="w-100 h2 bg-near-white br2 pointer f7 bn light-silver mt2 mb2 hover-bg-pink"
      data-projectid="${_projectId}"
      data-projectbranch="${_branchName}"
      onclick=${openAddRecipeModal}>add recipe</button>
    `
}

module.exports = AddRecipeButton