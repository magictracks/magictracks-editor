var html = require('choo/html')
const NavBar = require('../components/navbar');
const Pagination = require('../components/pagination');

const UserNav = require('../components/userNav');

// TODO: allow edits if authenticated, otherwise, remove buttons for editing
// if(state.user.authenticated){
// } else{
// }

module.exports = view

function view (state, emit) {

  let projectId,
      projectBranchName,
      recipeId,
      recipeBranchName;

  function openAddRecipeModal(e){
    console.log('open recipe modal');
    const {projectid, projectbranch} = e.currentTarget.dataset

    emit(state.events.addRecipeModal_selectProjectId, projectid)
    emit(state.events.addRecipeModal_selectProjectBranchName, projectbranch)
    emit(state.events.addRecipeModal_open)
  }

  function closeAddRecipeModal(e){
    console.log('close recipe modal');
    emit(state.events.addRecipeModal_close)
  }

  function addRecipeButton(parentId, branchName){
    return html`
      <button class="w-100 h1 bg-near-white br2 pointer f7 bn light-silver mt2 mb2"
      data-projectid="${parentId}"
      data-projectbranch="${branchName}"
      onclick=${openAddRecipeModal}>add recipe</button>
    `
  }

  function addRecipeModal(){
    
    // function submitForm(e){
    //   e.preventDefault();
    //   let formData = new FormData(e.currentTarget);

    //   let payload ={
    //     recipeData:{
    //       title: formData.get("title"),
    //       description: formData.get("description")
    //     },
    //     projectId,
    //     projectBranchName
    //   }

    //   emit(state.events.recipes_createAndPush, payload);
    // }

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

  function openAddLinkModal(e){
    console.log("open link modal")
    const{recipeid, recipebranch} = e.currentTarget.dataset

    emit(state.events.addLinkModal.selectRecipeId, recipeid)
    emit(state.events.addLinkModal.selectRecipeBranchName, recipebranch)
    emit(state.events.addLinkModal_open)
  }
  function closeLinkModal(e){
    console.log("close link modal")
    emit(state.events.addLinkModal_close)
  }

  function addLinkButton(parentId, branchName){
    return html`
      <button class="w-100 h1 bg-near-white br2 pointer f7 bn light-silver"
      data-recipeid="${parentId}"
      data-recipebranch="${branchName}"
      onclick=${openAddLinkModal}>add link</button>
    `
  }


  function addLinkModal(){
    
    function submitForm(e){
      e.preventDefault();
      let formData = new FormData(e.currentTarget);

      let payload ={
        linkData:{
          url: formData.get("url")
        },
        recipeId: state.addLinkModal.selectRecipeId,
        recipeBranchName: state.addLinkModal.selectRecipeBranchName
      }

      emit(state.events.links_createAndPush, payload);
    }

    function checkDisplay(){
      if(state.addLinkModal.display == true){
        return ""
      } else{
        return "dn"
      }
    }

    return html`
      <div id="addLinkModal" class="w-100 h-100 fixed ${checkDisplay()}" style="background-color:rgba(0, 27, 68, 0.5)">
        <div class="w-100 h-100 flex flex-column justify-center items-center">
          <div class="mw7 w-100 h-auto ba br2 bg-light-gray pt2 pb4 pl4 pr4">
            <div class="w-100 flex flex-row justify-between">
              <h2>New Link Modal</h2>
              <button class="bn f2 bg-light-gray" onclick=${closeLinkModal}>✕</button>
            </div>
            <section>
              <form name="addLinkForm" id="addLinkForm" onsubmit=${submitForm}>
              <fieldset class="w-100 mb2">
                <legend class="br-pill ba pl1 pr1">URL</legend>
                  <input class="w-100 bg-near-white bn br2 pa2" type="text" name="url">
              </fieldset>
              <fieldset class="w-100 mb2">
                <legend class="br-pill ba pl1 pr1">title</legend>
                  <input class="w-100 bg-near-white bn br2 pa2" type="text" name="title">
              </fieldset>
              <fieldset class="w-100 mb2">
                <legend class="br-pill ba pl1 pr1">description</legend>
                  <input class="w-100 bg-near-white bn br2 pa2" type="text" name="description">
              </fieldset>
              <input type="submit" value="save">
              </form>
            </section>
          </div>
        </div>
      </div>
    `
  }

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
          ${selectedBranch.recipes.length == 0 ? addRecipeButton(feature._id, selectedBranch.branchName) : ""}
            <!-- recipes list --> 
            ${selectedBranch.recipes.map( (recipe,idx) => {
              
              let selectedRecipe = recipe.recipe;

              let recipeBranch = selectedRecipe.branches.find( item => {
                return item.branchName == recipe.branchName || "default";
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
                  ${recipeBranch.links.length == 0 ? addLinkButton(selectedRecipe._id, recipeBranch.branchName) : ""}
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
                            ${addLinkButton(selectedRecipe._id, recipeBranch.branchName)}
                          </section>
                        `
                      })
                    }
                  </section>
                </fieldset>
                    ${addRecipeButton(feature._id, selectedBranch.branchName)}
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
    ${addLinkModal()}
    ${addRecipeModal()}
  </body>   
  `
}