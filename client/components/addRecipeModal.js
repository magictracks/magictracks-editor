var Component = require('choo/component')
var html = require('choo/html')

// class AddRecipeModal extends Component {
//   constructor (id, state, emit) {
//     super(id)
//     this.local = state.components[id] = {}
//   }

//   createElement () {
//     return html`
//       <div>
//       </div>
//     `
//   }

//   update () {
//     return true
//   }
// }


function AddRecipeModal(id, state, emit){

  function closeAddRecipeModal(e){
    console.log('close recipe modal');
    emit(state.events.addRecipeModal_close)
  }
  
  function addRecipe(e){
    e.preventDefault();
    let formData = new FormData(e.currentTarget);

    let payload ={
      recipeData:{
        title: formData.get("title"),
      }
    }

    emit(state.events.recipes_create, payload);
  }

  function checkDisplay(){
    if(state.addRecipeModal.display == true){
      return ""
    } else{
      return "dn"
    }
  }

  function selectItem(e){
    e.preventDefault();
    console.log("selectRecipe ID: ", e.currentTarget.dataset.id)
    
    emit(state.events.addRecipeModal_selectRecipe, e.currentTarget.dataset.id )
  }

  function pushSelectedRecipe(e){
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

  function pushNewBranch(e){
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

  function selectBranchName(e){
    e.preventDefault();
    console.log(e.currentTarget.value)
    emit(state.events.addRecipeModal_selectRecipeBranch, e.currentTarget.value)
  }

  function showSelectBranches(){
    if(state.addRecipeModal.selectRecipeBranches.length == 0){
      return html`
        <p class="ma0">select playlist to specify branch</p>
      `
    } else {
      return html`
      <div class="w-100 flex flex-row items-center">
        <select class="h3 f7 bn bg-white pa2 br2 br--left" onchange=${selectBranchName}>
          ${state.addRecipeModal.selectRecipeBranches.map(branch => {
            return html`
              <option value="${branch.branchName}" data-id="${branch._id}">${branch.branchName}</option>
            `
          })}
        </select>
        <button class="bn bg-light-purple br2 br--right pa2 h3" onclick=${pushSelectedRecipe}>use this branch</button>
        <div class="ml2 mr2"> - or - </div>
        <button class="bn bg-light-pink br2 pa2 h3" onclick=${pushNewBranch}> add new branch </button>
      </div>
      `
    }
  }

  return html`
    <div id="addRecipeModal" class="w-100 h-100 fixed ${checkDisplay()}" style="background-color:rgba(0, 27, 68, 0.5)">
      <div class="w-100 h-100 flex flex-column justify-center items-center">
        <div class="mw7 w-100 h-auto ba br2 bg-light-gray pt2 pb4 pl4 pr4">
          <div class="w-100 flex flex-row justify-between">
            <h2>Add Recipe Modal</h2>
            <button class="bn f2 bg-light-gray" onclick=${closeAddRecipeModal}>✕</button>
          </div>
          <section>
            <fieldset>
            <legend>Select Recipe</legend>
              <section>
              <ul class="list pl0 overflow-y-scroll" style="max-height:250px;">
                ${state.recipes.map( item => {
                  return html`
                    <li class="w-100 flex flex-row items-center justify-start pa2"
                    onclick=${selectItem} data-id="${item._id}"> 
                      <div class="h2 w2 br2 mr2" 
                      style="background-color:${item.colors[item.selectedColor]}"></div> 
                      <p>${item.title}</p>
                    </li>
                  `
                })}
              </ul>
              </section>
              <section>
                <!-- add new playlist form --> 
                <form name="addRecipeForm" id="addRecipeForm" onsubmit=${addRecipe}>
                    <div class="flex flex-row">
                    <input class="w-100 bg-near-white bn br2 pa2 mr2" placeholder="e.g. new recipe name" type="text" name="title">
                    <input class="br2 bn bg-light-green pa2" type="submit" value="add recipe">
                    </div>
                </form>
              </section>
            </fieldset>
            <section class="mt2 flex flex-row justify-between items-center">
                <button class="br2 bn bg-light-red h3" onclick=${closeAddRecipeModal}>cancel</button>
                <div class="h3 flex flex-column justify-center">
                  ${showSelectBranches()}
                </div>
            </section>
          </section>
        </div>
      </div>
    </div>
  `
}


module.exports = AddRecipeModal