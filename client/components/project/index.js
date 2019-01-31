var html = require('choo/html')

const RecipeList = require('./RecipeList');
const ProjectHeader = require('./projectHeader');
const AddRecipeButton = require('./AddRecipeButton');


module.exports = Project;

function Project(state, emit){
    const {selected, id, branch} = state.current.projects;
    let selectedBranch = {};
    

    if(typeof selected.branches == 'object'){
        selectedBranch = selected.branches.find( _branch => _branch.branchName == branch );

        return html`
            <section class="w-100">
                ${state.cache(ProjectHeader, "ProjectHeader", state, emit).render(selected)}

                ${state.cache(RecipeList, "RecipeList", state, emit).render(selectedBranch.recipes, selectedBranch._id)}  

                ${new AddRecipeButton(state, emit, selected._id, branch)}
            </section>
        `
    } else{
        return html`<div>fetching data</div>`
    }
    

    
}

//          