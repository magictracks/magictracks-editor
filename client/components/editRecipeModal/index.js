var html = require('choo/html')

const CloseModalBtn = require('./closeModalBtn');
const BranchControlMenu = require('./BranchControlMenu');
const RecipeDetailsMenu = require('./RecipeDetailsMenu');

module.exports = EditRecipeModal;

function checkDisplay(state, emit){
    if(state.editRecipeModal.display == true){
        return ""
    } else{
        return "dn"
    }
}

function EditRecipeModal(state, emit){
    const {selected, id, branch} = state.current.recipes;

    // TODO: figure out better error checking!
    if(typeof selected == "object" && Object.keys(selected).length > 0){
        return html`
        <div id="editRecipeModal" class="w-100 h-100 fixed ${checkDisplay(state, emit)}" style="background-color:rgba(0, 27, 68, 0.5)">
            <div class="w-100 h-100 flex flex-column justify-center items-center pa2">
                <div class="mw7 w-100 h-auto overflow-auto ba br2 bg-light-gray pt2 pb4 pl4 pr4">
                    <div class="w-100 flex flex-row justify-between">
                        <h2>Edit Recipe</h2>
                        ${state.cache(CloseModalBtn, "CloseRecipeModalBtn", state, emit).render()}
                    </div>
                    <!-- main project modal area -->
                    <section>
                    ${new BranchControlMenu(state, emit, selected)}
                    ${new RecipeDetailsMenu(state, emit, selected)}
                    </section>
                </div>
            </div>
        </div>
        `
    }
    
}


/**
 * ${new BranchControlMenu(state, emit, selected)}
                ${new RecipeDetailsMenu(state, emit, selected)}
 */

  