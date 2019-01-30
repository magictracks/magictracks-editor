var Component = require('choo/component')
var html = require('choo/html')




function RemoveLinkButton(state, emit, _recipeId, _linkId){
    
  function removeFromRecipe(e){
      // console.log("remove from recipe!", e.currentTarget.dataset)
      const{recipeid, linkid} = e.currentTarget.dataset

      const payload = {
        recipeId: recipeid,
        linkId: linkid
      }

      if (confirm("Are you sure you want to remove this link from this recipe?")) {
        console.log("remove from recipe!", e.currentTarget.dataset)
        emit(state.events.recipes_removeLink, payload)
      } else {
        console.log("cancel!")
      }

    }

    if(state.user.authenticated == true){
      return html`
      <small class="pointer bn black hover-bg-orange"
      data-recipeid="${_recipeId}"
      data-linkid="${_linkId}"
      onclick=${removeFromRecipe}>╳</small>
    `
    }
    
}

module.exports = RemoveLinkButton