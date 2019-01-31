const html = require('choo/html');

module.exports = BranchActionModule;

function BranchActionModule(state, emit) {
  if (state.addRecipeModal.selectRecipeBranches.length == 0) {
    return html `
        <p class="ma0">select playlist to specify branch</p>
      `
  } else {
    return html `
      <div class="w-100 flex flex-row items-center">
        ${branchSelectMenu(state, emit)}
        <div class="ml2 mr2"> - or - </div>
        ${pushNewBranchBtn(state, emit)}
      </div>
      `
  }
}

function pushNewBranchBtn(state, emit) {

  function pushNewBranch(state, emit) {
    return e => {
      e.preventDefault();
      console.log("adding auto named new branch and adding to selected project")

      let payload = {
        projectId: state.addRecipeModal.selectProjectId,
        projectBranchName: state.addRecipeModal.selectProjectBranchName,
        recipeId: state.addRecipeModal.selectRecipe
      }

      emit(state.events.recipes_addBranchAndPush, payload)
      emit(state.events.addRecipeModal_close);
    }

  }

  return html `
      <button class="bn bg-light-pink br2 pa2 h3" onclick=${pushNewBranch(state, emit)}> add new branch </button>
      `
}

function branchSelectMenu(state, emit) {
  return html `
      <div class="flex flex-row items-center">
          ${branchSelectDropdown(state, emit)}
          ${pushSelectedRecipeBtn(state, emit)}
      </div>
      `
}

function pushSelectedRecipeBtn(state, emit) {

  function pushSelectedRecipe(state, emit) {
    return e => {
      e.preventDefault();
      console.log("push selected Recipe branch to selected project");

      let payload = {
        projectId: state.addRecipeModal.selectProjectId,
        projectBranchName: state.addRecipeModal.selectProjectBranchName,
        recipeId: state.addRecipeModal.selectRecipe,
        recipeBranchName: state.addRecipeModal.selectRecipeBranch,
      }

      emit(state.events.projects_pushRecipe, payload)
      emit(state.events.addRecipeModal_close);
    }
  }


  return html `
      <button class="bn bg-light-purple br2 br--right pa2 h3" onclick=${pushSelectedRecipe(state, emit)}>use this branch</button>
      `
}

function branchSelectDropdown(state, emit) {

  function selectBranchName(state, emit) {
    return e => {
      e.preventDefault();
      console.log(e.currentTarget.value)
      emit(state.events.addRecipeModal_selectRecipeBranch, e.currentTarget.value)
    }

  }

  return html `
      <select class="h3 f7 bn bg-white pa2 br2 br--left" onchange=${selectBranchName(state, emit)}>
          ${state.addRecipeModal.selectRecipeBranches.map(branch => {
          return html`
              <option value="${branch.branchName}" data-id="${branch._id}">${branch.branchName}</option>
          `
          })}
      </select>
      `
}
