var Component = require('choo/component')
var html = require('choo/html')




function RemoveRecipeButton(state, emit, _projectId, _recipeId){
    
  function removeFromProject(e){
      // console.log("remove from recipe!", e.currentTarget.dataset)
      const{projectid, recipeid} = e.currentTarget.dataset

      const payload = {
        projectId: projectid,
        recipeId: recipeid
      }

      if (confirm("Are you sure you want to remove this recipe from this project?")) {
        console.log("remove from project!", e.currentTarget.dataset)
        emit(state.events.projects_removeRecipe, payload)
      } else {
        console.log("cancel!")
      }

    }

    if(state.user.authenticated == true && state.params.collection != 'recipes'){
      return html`
      <small class="pointer bn black hover-bg-orange"
      data-projectid="${_projectId}"
      data-recipeid="${_recipeId}"
      onclick=${removeFromProject}>╳</small>
    `
    }
    
}

module.exports = RemoveRecipeButton