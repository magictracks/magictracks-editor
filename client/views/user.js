var html = require('choo/html')

const NavBar = require('../components/navbar');
const UserNav = require('../components/userNav');
const CreateNewBtn = require('../components/createNewBtn');

const addRecipeButton = require('../components/addRecipeButton');
const addLinkButton = require('../components/addLinkButton');


// const Project = require('../components/Project');
const Project = require('../components/project/index')

const Recipe = require('../components/recipe/index');

const EditProjectModal = require('../components/editProjectModal/index');
const EditRecipeModal = require('../components/editRecipeModal/index');
const EditLinkModal = require('../components/editLinkModal/index');

// const addRecipeModal = require('../components/addRecipeModal');
// const addLinkModal = require('../components/addLinkModal');


module.exports = view

function view(state, emit) {

  const {collection, user } = state.params;

  // IF a user navigates to just the /user -- forward them to projects
  if(state.params.hasOwnProperty('user') && !state.params.hasOwnProperty('collection')){
    console.log("hey!  that's me!")
    emit('pushState', `/${user}/projects`);
    return html`<body>fetching data</body>`
  }


  function selectItem(e) {
    const {id, branch} = e.currentTarget.dataset;
    emit("pushState", `/${user}/${collection}/${id}/${branch}`)
    // emit(state.events.RENDER)
  }

  function collectionItem(item){
    return html`
      <div onclick=${selectItem} data-id=${item._id} data-branch=${item.selectedBranch} class="ba br2 w-100 pt4 pb4 pr3 pl3 flex flex-row items-center h3 mb1">
        <div class="w2 h2 br2 mr4" style="background-color:${item.colors[item.selectedColor]}"></div>
        <p class="f5">${item.title}</p>
      </div>
    `
  }

  function collectionItems(state, emit){
    return html`
      <div class="w-100">
        <!-- UserNav --> 
        ${state.cache(UserNav, "UserNav", state, emit).render()}
        
        <!-- create new X -->
        ${state.cache(CreateNewBtn, "CreateNewBtn", state, emit).render()}
        
        <!-- collection list --> 
        ${ state[collection].map( item => {
            return collectionItem(item);
          })
        }
      </div>
    `
  }


  function renderSelection(){

    if(state.params.hasOwnProperty("id")){
      
      if(collection == "links"){ return html`<div><p>${state.current.links.selected.title}</p></div>`};
      
      if(collection == "projects"){ 
        return new Project(state, emit)
      };
      // if(collection == "recipes"){ return html`<div><p>${state.current.recipes.selected.title}</p></div>`};
      if(collection == "recipes"){ 
        return new Recipe(state, emit)
      };

    } else {
      return collectionItems(state, emit)
    }
  }

  return html `
  <body class="w-100 h-100 code lh-copy bg-white ma0 flex flex-column items-center">

    ${state.cache(NavBar, "NavBar", state, emit).render()}

    <main class="w-100 h-100 flex flex-column items-center mw8 pa4">
      <section class="mt2 w-100 flex flex-column items-start">
        ${renderSelection()}
      </section>
    </main>
    
    ${new EditLinkModal(state, emit)}
    ${new EditRecipeModal(state, emit)}
    ${new EditProjectModal(state, emit)}
  </body>   
  `
}


// /<!-- addLinkModal, addRecipeModal, and EditProjectModal -->
// ${addLinkModal("AddLinkModal", state, emit)}
// ${addRecipeModal("AddRecipeModal", state, emit)}
// ${state.cache(EditProjectModal,"EditProjectModal", state, emit).render()}