const html = require('choo/html');

module.exports = RecipeSelectModule;

function RecipeSelectModule(state, emit){
    return html`
    <fieldset class="ba br2 b--black">
        <legend class="br-pill pl2 pr2 ba b--black">Select Recipe</legend>
        <section>
            ${RecipeSelectList(state, emit)}
        </section>
        <section>
            ${AddRecipeForm(state, emit)}
        </section>
    </fieldset>
    `

}


function AddRecipeForm(state, emit){
        
    function addRecipe(state, emit){
        return e => {
            e.preventDefault();
            let formData = new FormData(e.currentTarget);
        
            let payload ={
                recipeData:{
                title: formData.get("title"),
                }
            }
        
            emit(state.events.recipes_create, payload);
        }
    }

    return html`
    <form name="addRecipeForm" id="addRecipeForm" onsubmit=${addRecipe(state, emit)}>
        <div class="flex flex-row">
        <input class="w-100 bg-near-white bn br2 pa2 mr2" placeholder="e.g. new recipe name" type="text" name="title">
        <input class="br2 bn bg-light-green pa2" type="submit" value="add recipe">
        </div>
    </form>
    `
}

function RecipeSelectList(state, emit){

    function selectItem(state, emit ){
        return e => {
            e.preventDefault();
            console.log("selectRecipe ID: ", e.currentTarget.dataset.id)   
            emit(state.events.addRecipeModal_selectRecipe, e.currentTarget.dataset.id )
        }
      }

      function highlightSelected(state, emit, item){
          if(item._id == state.addRecipeModal.selectRecipe){
              return 'ba bw2 b--navy'
          } else{
              return ''
          }
      }


    return html`
    <ul class="list overflow-y-scroll bg-moon-gray pa2 br2" style="max-height:250px;">
        ${state.recipes.map( item => {
        return html`
            <li class="w-100 flex flex-row items-center justify-start pa2 br2 mb2 bg-light-gray ${highlightSelected(state, emit, item)}" onclick=${selectItem(state, emit)} data-id="${item._id}"> 
                <div class="h2 w2 br2 mr2" style="background-color:${item.colors[item.selectedColor]}"></div> 
                <p>${item.title}</p>
            </li>
        `
        })}
    </ul>
    `
}

