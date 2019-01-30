var html = require('choo/html')

const RecipeHeader = require('./recipeHeader');
const LinkList = require('./LinkList');


module.exports = Recipe;

function Recipe(state, emit, _selected, _branch, _idx){
    let selected, branch, branchData;

    if(_selected && _branch){
        selected = _selected;
        branch = _branch;
    } else{
        console.log("🌈",state.current.recipes.selected, state.current.recipes.branch)
        selected = state.current.recipes.selected;
        branch = state.current.recipes.branch
    }

    function showLegend(selected){
        if(_idx != undefined){
            return html`
            <legend class="br-pill ba pl2 pr2">Recipe #${_idx + 1}</legend>
            `
        } 
    }

    if(Object.keys(selected).length > 0 ){
        branchData = selected.branches.find(item => item.branchName == branch);

        let recipeUniqueName = `RecipeHeader_${selected.uniqueName}`
        let linkListUniqueName = `LinkList_${selected.uniqueName}`
        console.log(linkListUniqueName)

        return html`
        <section class="mb4 pl2 pr2">
            <fieldset class="ba br2 b--black">
                ${showLegend(selected)}
                ${state.cache(RecipeHeader, recipeUniqueName, state, emit).render(selected)}

                <section>
                ${state.cache(LinkList, linkListUniqueName, state, emit).render(branchData.links)}  
                </section>
            </fieldset>
        </section>
        `
    } else {
        return html`<div>fetching data</div>`
    }  
    


    
    

    
}

/**
 * 
 */