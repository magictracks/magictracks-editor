var html = require('choo/html')
const NavBar = require('../components/navbar');
const Pagination = require('../components/pagination');

module.exports = view

function view (state, emit) {

  let projectId,
      projectBranchName,
      recipeId,
      recipeBranchName;

  // TODO: allow edits if authenticated, otherwise, remove buttons for editing
  // if(state.user.authenticated){
  // } else{
  // }

  // show the selected feature(s) 
  function showUserNav(){

    function checkPath(_path){
      if(_path == state.params.collection){
        return 'underline'
      } else{
        return ''
      }
    }

    if(!state.params.hasOwnProperty("id")){
      // if an id property exists in params, just show me that one item
      return html`
    <section class="mt2 w-100 flex flex-column items-start">
      <div>
        <h2>@${state.params.user}</h2>
        <p class="f7">${'#'} <a href="#">Followers</a> · ${'#'} <a href="#">Following</a></p>
      </div>
      <ul class="list pl0 flex flex-row">
        <li class="mr4"><a class="link black ${checkPath('projects')}" href="/${state.params.user}/projects">Projects</a></li>
        <li class="mr4"><a class="link black ${checkPath('recipes')}" href="/${state.params.user}/recipes">Recipes</a></li>
        <li class="mr4"><a class="link black ${checkPath('links')}" href="/${state.params.user}/links">Contributed Links</a></li>
      </ul>
    </section>
    `
    }

  }


  function toggleAddRecipeModal(e){
    console.log('add recipe button');
    projectId = e.currentTarget.dataset.projectid;
    projectBranchName = e.currentTarget.dataset.projectbranch;
    // console.log(e.currentTarget)
    console.log(projectId, projectBranchName)

    document.querySelector("#addRecipeModal").classList.toggle("dn");
  }


  function addRecipeModal(){
    
    function submitForm(e){
      e.preventDefault();
      let formData = new FormData(e.currentTarget);

      let payload ={
        recipeData:{
          title: formData.get("title"),
          description: formData.get("description")
        },
        projectId,
        projectBranchName
      }

      emit(state.events.recipes_createAndPush, payload);
    }

    return html`
      <div id="addRecipeModal" class="w-100 h-100 fixed dn" style="background-color:rgba(0, 27, 68, 0.5)">
        <div class="w-100 h-100 flex flex-column justify-center items-center">
          <div class="mw7 w-100 h-auto ba br2 bg-light-gray pt2 pb4 pl4 pr4">
            <div class="w-100 flex flex-row justify-between" onclick=${toggleAddLinkModal}>
              <h2>Add Recipe Modal</h2>
              <button class="bn f2 bg-light-gray">✕</button>
            </div>
            <section>
              <form name="addRecipeForm" id="addRecipeForm" onsubmit=${submitForm}>
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

  function addRecipeButton(parentId, branchName){
    return html`
      <button class="w-100 h1 bg-near-white br2 pointer f7 bn light-silver mt2 mb2"
      data-projectid="${parentId}"
      data-projectbranch="${branchName}"
      onclick=${toggleAddRecipeModal}>add recipe</button>
    `
  }

  function toggleAddLinkModal(e){
    console.log("add link button")
    recipeId = e.currentTarget.dataset.recipeid;
    recipeBranchName = e.currentTarget.dataset.recipebranch;
    // console.log(e.currentTarget)
    console.log(recipeId, recipeBranchName)

    document.querySelector("#addLinkModal").classList.toggle("dn");
  }

  function addLinkButton(parentId, branchName){
    return html`
      <button class="w-100 h1 bg-near-white br2 pointer f7 bn light-silver"
      data-recipeid="${parentId}"
      data-recipebranch="${branchName}"
      onclick=${toggleAddLinkModal}>add link</button>
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
        recipeId,
        recipeBranchName
      }

      emit(state.events.links_createAndPush, payload);
    }

    return html`
      <div id="addLinkModal" class="w-100 h-100 fixed dn" style="background-color:rgba(0, 27, 68, 0.5)">
        <div class="w-100 h-100 flex flex-column justify-center items-center">
          <div class="mw7 w-100 h-auto ba br2 bg-light-gray pt2 pb4 pl4 pr4">
            <div class="w-100 flex flex-row justify-between" onclick=${toggleAddLinkModal}>
              <h2>New Link Modal</h2>
              <button class="bn f2 bg-light-gray">✕</button>
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
      emit(state.events.find_projects, query)
      return html`<div>fetching data</div>`
    } else{
      // console.log(feature);
      let selectedBranch = feature.branches.find(item => {
        return item.branchName == 'default'
      })

      // NOTE Global Variable Set
      projectId = feature._id;
      projectBranchName = selectedBranch.branchName;



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
          ${selectedBranch.recipes.length == 0 ? addRecipeButton(feature._id, projectBranchName) : ""}
            <!-- recipes list --> 
            ${selectedBranch.recipes.map( (recipe,idx) => {
              
              let selectedRecipe = recipe.recipe;

              let recipeBranch = selectedRecipe.branches.find( item => {
                return item.branchName == 'default'
              })


              // NOTE Global Variable Set
              recipeId = selectedRecipe._id;
              recipeBranchName = recipeBranch.branchName;

              console.log(selectedRecipe);

              

              return html`
                <section class="mb2 mt2">
                <fieldset class="w-100 ba br2" dataset-id="${selectedRecipe._id}" dataset-db="${selectedRecipe.featureType}">
                  <legend class="ba br-pill pl1 pr1">Recipe #${idx}</legend>
                  <div class="w-100 br1 br--top flex flex-row justify-end pa1" style="background-color:${selectedRecipe.colors[selectedRecipe.selectedColor]}">edit</div>
                  <section>
                    <h3>${selectedRecipe.title}</h3>
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
                              <div class="w-100 br1 br--top flex flex-row justify-end pa1" style="background-color:${selectedLink.colors[selectedLink.selectedColor]}">edit</div>
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
                    ${addRecipeButton(feature._id, projectBranchName)}
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
      ${showUserNav()}

      <section class="mt2 w-100 flex flex-column items-start">
      ${showUserSelection()}
      </section>
    
      
    </main>
    ${addLinkModal()}
    ${addRecipeModal()}
  </body>   
  `
}