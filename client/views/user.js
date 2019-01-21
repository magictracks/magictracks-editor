var html = require('choo/html')
const NavBar = require('../components/navbar');
const Pagination = require('../components/pagination');

const UserNav = require('../components/userNav');
const addRecipeButton = require('../components/addRecipeButton');
const addLinkButton = require('../components/addLinkButton');
const addRecipeModal = require('../components/addRecipeModal');
const addLinkModal = require('../components/addLinkModal');


// TODO: allow edits if authenticated, otherwise, remove buttons for editing
// if(state.user.authenticated){
// } else{
// }

module.exports = view

function view (state, emit) {

  function renderProject(){
    let {collection, user, id} = state.params;
    
    let feature = state[collection].find(item => {
      return item._id === id;
    });

    if(feature === undefined){
      let query = {"query": {"$or": [
        {"owner": user},
        {"collaborators":[user]}
      ]}}
      // console.log(query);
      emit(state.events.projects_find, query)
      return html`<div>fetching data</div>`
    } else{
      // console.log(feature);
      let selectedBranch = feature.branches.find(item => {
        return item.branchName == 'default'
      })

      //!!! TODO: get branchName from query params!!!
      emit(state.events.addRecipeModal_selectProjectId, feature._id);
      emit(state.events.addRecipeModal_selectProjectBranchName, selectedBranch.branchName);
      

      return html`
      <div class="w-100 h-100">
        
        <section class="mb4">
          <!-- header -->
          <p class="w-100 flex flex-row justify-start items-center"><small class="f7">project</small> · <small>edit</small></p>
          <h2>${feature.title}</h2>
          <p class="f7">${'#'} High-Fives · ${'#'} Forks · ${'#'} Followers · Download/Share </p>
          <p>${feature.description}</p>
          <ul class="list pl0"></ul>
        </section>
  
        
        <section>
          ${selectedBranch.recipes.length == 0 ? addRecipeButton(state, emit, feature._id, selectedBranch.branchName) : ""}
            <!-- recipes list --> 
            ${selectedBranch.recipes.map( (recipe,idx) => {
              
              let selectedRecipe = recipe.recipe;

              let recipeBranch = selectedRecipe.branches.find( item => {
                if(item.hasOwnProperty("branchName")){
                  return item.branchName == recipe.branchName
                } else {
                  return item.branchName == "default";
                }
              })


              // !!! TODO: fix the redundancy !!!
              // emit(state.events.addLinkModal_selectRecipeId, selectedRecipe._id)
              // emit(state.events.addLinkModal_selectRecipeBranchName, recipeBranch.branchName)
              // emit(state.events.addRecipeModal_selectRecipe, selectedRecipe._id)         

              return html`
                <section class="mb2 mt2">
                <fieldset class="w-100 ba br2" dataset-id="${selectedRecipe._id}" dataset-db="${selectedRecipe.featureType}">
                  <legend class="ba br-pill pl1 pr1">Recipe #${idx}</legend>
                  <div class="w-100 br1 br--top flex flex-row justify-end pa1 f7" style="background-color:${selectedRecipe.colors[selectedRecipe.selectedColor]}">edit</div>
                  <section>
                    <h3>${selectedRecipe.title} <small class="f7">(${recipeBranch.branchName})</small></h3>
                    <p class="f7">${'#'} High-Fives · ${'#'} Forks · ${'#'} Followers · Download/Share </p>
                    <p>${selectedRecipe.description}</p>
                  </section>
                  ${recipeBranch.links.length == 0 ? addLinkButton(state, emit, selectedRecipe._id, recipeBranch.branchName) : ""}
                  <section>
                    <!-- links list --> 
                    ${
                      recipeBranch.links.map( (link) => {
                        let selectedLink = link.link;
                        
                        return html`
                          <section class="mb2 mt2">
                            <div class="w-100 flex flex-column br2 ba">
                              <div class="w-100 br1 br--top flex flex-row justify-end pa1 f7" style="background-color:${selectedLink.colors[selectedLink.selectedColor]}">edit</div>
                              <div class="w-100 flex flex-row pa2 items-center f7">
                                <div class="w2 h2 mr4" style="background-color:${selectedLink.colors[selectedLink.selectedColor]}"></div>
                                <div class="w-40 flex flex-column">
                                  <small>${selectedLink.url}</small>
                                  <p>${selectedLink.title}</p>
                                </div>
                                <div class="w-40"><p>${selectedLink.description}</p></div>
                                <div class="w2 h2">more</div>
                              </div>
                            </div>
                            ${addLinkButton(state, emit, selectedRecipe._id, recipeBranch.branchName)}
                          </section>
                        `
                      })
                    }
                  </section>
                </fieldset>
                    ${addRecipeButton(state, emit, feature._id, selectedBranch.branchName)}
                </section>
              `
            })}
        </section>
      </div>
      `
    }

    
  }

  function renderRecipe(){
    return html`
    <div>specific recipe</div>
    `
  }

  function renderLink(){
    return html`
    <div>specific link</div>
    `
  }

  // show the selected feature(s) 
  function showUserSelection(){
    let {collection, user} = state.params;

    function selectItem(e){
      let itemId = e.currentTarget.dataset.id;
      emit("pushState", `/${user}/${collection}/${itemId}`)
    }

    if(state.params.hasOwnProperty("id")){
      // if an id property exists in params, just show me that one item
      if(collection === "projects"){
        return renderProject();
      } else if (collection === "recipes"){
        return renderRecipe();
      } else if (collection === "links"){
        return renderLink();
      }

    } else {
      // otherwise if no id property exists in params, show me the list
      return state[collection].map( item => {
        return html`
          <div onclick=${selectItem} data-id=${item._id} class="ba br2 w-100 pt4 pb4 pr3 pl3 flex flex-row items-center h3 mb1">
            <div class="w2 h2 br2 mr4" style="background-color:${item.colors[item.selectedColor]}"></div>
            <p class="f5">${item.title}</p>
          </div>
        `
      })
    }

  }

  return html`
  <body class="w-100 h-100 code lh-copy bg-white ma0 flex flex-column items-center">
    <!-- NavBar Top -->
    ${state.cache(NavBar, "NavBar", state, emit).render()}
    <!-- MAIN -->
    <main class="w-100 h-100 flex flex-column items-center mw8 pa4">
      ${UserNav("UserNav", state, emit)}

      <section class="mt2 w-100 flex flex-column items-start">
      ${showUserSelection()}
      </section>
    
      
    </main>
    ${addLinkModal("AddLinkModal", state, emit)}
    ${addRecipeModal("AddRecipeModal", state, emit)}
  </body>   
  `
}