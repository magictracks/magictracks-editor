var html = require('choo/html')
const NavBar = require('../components/navbar');
const Pagination = require('../components/pagination');

const UserNav = require('../components/userNav');
const addRecipeButton = require('../components/addRecipeButton');
const addLinkButton = require('../components/addLinkButton');
const addRecipeModal = require('../components/addRecipeModal');
const addLinkModal = require('../components/addLinkModal');

const Project = require('../components/Project');
const Recipe = require('../components/Recipe');

const EditProjectModal = require('../components/EditProjectModal');


// TODO: allow edits if authenticated, otherwise, remove buttons for editing
// if(state.user.authenticated){
// } else{
// }

module.exports = view

function view (state, emit) {


  function renderLink(){
    return html`
    <div>specific link</div>
    `
  }

  function addNewFeature(){
    const {collection} = state.params;
    function triggerAdd(e){
      console.log("add new!")
      let createFunction = `${collection}_create`;
      let feat;
      let payload;

      if(collection == "projects"){
        feat = "New Project!";
        payload = {"projectData":{"title": feat}};
      } else if (collection == "recipes"){
        feat = "New Recipe!";
        payload = {"recipeData":{"title": feat}};
      } else if (collection == "links") {
        feat = "New Recipe!";
        payload = {"linkData":{"title": feat}};
      }

      emit(state.events[createFunction], payload);
    }

    return html`
    <div onclick=${triggerAdd} class="bn bg-light-gray br2 w-100 pt4 pb4 pr3 pl3 flex flex-row items-center h3 mb1">
      <button class="w2 h2 br2 mr4 bg-white f4 bn ma0 pb1">+</button>
      <p class="f5">Add New</p>
    </div>
    `
  }

  // show the selected feature(s) 
  function showUserSelection(){
    let {collection, user} = state.params;

    function selectItem(e){
      const {id, branch} = e.currentTarget.dataset;
      emit("pushState", `/${user}/${collection}/${id}/${branch}`)
    }

    if(state.params.hasOwnProperty("id")){
      // if an id property exists in params, just show me that one item
      if(collection === "projects"){
        // return renderProject();
        let p = new Project("Project", state, emit)
        return p.render();
      } else if (collection === "recipes"){
        // return renderRecipe();
        let r = new Recipe("Recipe", state, emit)
        return r.render();
      } else if (collection === "links"){
        return renderLink();
      }

    } else {
      // otherwise if no id property exists in params, show me the list

      return html`
      <div>
      ${addNewFeature()}
      ${
          state[collection].map( item => {
          return html`
            <div onclick=${selectItem} data-id=${item._id} data-branch=${item.selectedBranch} class="ba br2 w-100 pt4 pb4 pr3 pl3 flex flex-row items-center h3 mb1">
              <div class="w2 h2 br2 mr4" style="background-color:${item.colors[item.selectedColor]}"></div>
              <p class="f5">${item.title}</p>
            </div>
          `
        })
      }
      </div>
      `
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
    ${state.cache(EditProjectModal,"EditProjectModal", state, emit).render()}
  </body>   
  `
}