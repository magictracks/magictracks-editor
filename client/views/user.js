var html = require('choo/html')
const NavBar = require('../components/navbar');
const Pagination = require('../components/pagination');

module.exports = view

function view (state, emit) {

  // function renderCurrentProfile(){
  //   if(state.params.user){
  //     return html`
      
  //     `
  //   } else{
  //     return html`
  //     <section class="mt2 w-100 flex flex-column items-start">
  //       <div>
  //         <h2>Browse</h2>
  //       </div>
  //       <ul class="list pl0 flex flex-row">
  //         <li class="mr4"><a class="link black underline" href="/projects">Projects</a></li>
  //         <li class="mr4"><a class="link black underline" href="/recipes">Recipes</a></li>
  //         <li class="mr4"><a class="link black underline" href="/links">Links</a></li>
  //       </ul>
  //     </section>
  //     `
  //   }
  // }

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

  function addSectionButton(){
    return html`
      <button class="w-100 h1 bg-near-white br2 pointer f7 bn light-silver mt2 mb2" onclick=${()=> console.log('add section')}>add section</button>
    `
  }

  function addLinkButton(){
    return html`
      <button class="w-100 h1 bg-near-white br2 pointer f7 bn light-silver" onclick=${()=> console.log('add link')}>add link</button>
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
      console.log(query);
      emit(state.events.find_projects, query)
      return html`<div>fetching data</div>`
    } else{
      console.log(feature);
      let selectedBranch = feature.branches.find(item => {
        return item.branchName == 'default'
      })



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
        ${selectedBranch.recipes.length == 0 ? addSectionButton() : ""}
          <!-- recipes list --> 
          ${selectedBranch.recipes.map( (recipe,idx) => {
            let selectedRecipe = recipe.recipe;

            let recipeBranch = selectedRecipe.branches.find( item => {
              return item.branchName == 'default'
            })

            return html`
              <section class="mb2 mt2">
              <fieldset class="w-100 ba br2">
                <legend class="ba br-pill pl1 pr1">Recipe #${idx}</legend>
                <div class="w-100 br1 br--top flex flex-row justify-end pa1" style="background-color:${selectedRecipe.colors[selectedRecipe.selectedColor]}">edit</div>
                <section>
                  <h3>${selectedRecipe.title}</h3>
                  <p class="f7">${'#'} High-Fives · ${'#'} Forks · ${'#'} Followers · Download/Share </p>
                  <p>${selectedRecipe.description}</p>
                </section>
                ${recipeBranch.links.length == 0 ? addLinkButton() : ""}
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
                        ${addLinkButton()}
                        </section>
                      `
                    })
                  }
                </section>
              </fieldset>
                  ${addSectionButton()}
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
  </body>   
  `
}