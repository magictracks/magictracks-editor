var html = require('choo/html')

const RecipeHeader = require('./recipeHeader');
const LinkList = require('./LinkList');
const AddLinkButton = require('./AddLinkButton');


module.exports = Recipe;

function Recipe(state, emit, _selected, _branch, _idx, _parentId){
    let selected, branch, branchData;
    let parentDetails = {collection:'', _id:''}

    if(_selected && _branch){
        selected = _selected;
        branch = _branch;
    } else{
        console.log("🌈",state.current.recipes.selected, state.current.recipes.branch)
        selected = state.current.recipes.selected;
        branch = state.current.recipes.branch
    }

    if(_parentId){
        parentDetails = {
            collection: 'projects?branches._id',
            _id: _parentId
        }
    }


    function showLegend(selected){
        if(_idx != undefined){
            return html`
            <legend class="br-pill ba pl2 pr2">Recipe #${_idx + 1}</legend>
            `
        } 
    }

    if(typeof selected == "object"){
        if(Object.keys(selected).length > 0 && selected.branches.length > 0 ){
            branchData = selected.branches.find(item => item.branchName == branch);
    
            // TODO: error checking and handling!
            if(branchData == undefined) branchData = selected.branches[0];

            let recipeUniqueName = `RecipeHeader_${selected.uniqueName}`
            let linkListUniqueName = `LinkList_${selected.uniqueName}`
    
    
            return html`
            <section class="mb2 mt2" data-parentdb="${parentDetails.collection}" data-parentid="${parentDetails._id}" data-id="${selected._id}">
                <fieldset class="ba br2 b--black">
                    ${showLegend(selected)}
                    ${state.cache(RecipeHeader, recipeUniqueName, state, emit).render(selected, _parentId)}
    
                    <section>
                    ${state.cache(LinkList, linkListUniqueName, state, emit).render(branchData.links, branchData._id)}  
                    </section>
                    <section>
                    ${new AddLinkButton(state, emit, selected._id, branch)}
                    </section>
                </fieldset>
            </section>
            `
        } else {
            return html`<div>fetching data</div>`
        }  
    }
    
}

/**
 * 
 */