var Component = require('choo/component')
var html = require('choo/html')

const addLinkButton = require('./addLinkButton');
const addRecipeButton = require('./addRecipeButton');

class Project extends Component {
  constructor (id, state, emit) {
    super(id)
    this.state = state;
    this.emit = emit;
    this.local = state.components[id] = {}

    // set project params
    this.collection = state.params.collection;
    this.user = state.params.user;
    this.id = state.params.id;
    this.branch = state.params.branch;

    this.project = state[this.collection].find(item => {
      return item._id === this.id;
    });

    this.projectBranch = {};

    this.projectHeader = this.projectHeader.bind(this);
    this.recipeItem = this.recipeItem.bind(this);
    this.recipeList = this.recipeList.bind(this);
    this.linkItem = this.linkItem.bind(this);
    this.linkList = this.linkList.bind(this);
  }


  projectHeader(feature){
    return html`
    <section class="mb4">
      <p class="w-100 flex flex-row justify-start items-center"><small class="f7">project</small> · <small>edit</small></p>
      <h2>${feature.title}
      <small class="f7"> (${feature.selectedBranch})</small>
      </h2>
      <p class="f7">${'#'} High-Fives · ${'#'} Forks · ${'#'} Followers · Download/Share </p>
      <p>${feature.description}</p>
      <ul class="list pl0"></ul>
    </section>
    `
  }

  recipeItem(selectedRecipe, recipeBranch, recipeIndex){
    return html`
    <section class="mb2 mt2">
      <fieldset class="w-100 ba br2" dataset-id="${selectedRecipe._id}" dataset-db="${selectedRecipe.featureType}">
      
        <!-- Recipe legend -->
        <legend class="ba br-pill pl1 pr1">Recipe #${recipeIndex}</legend>
        <div class="w-100 br1 br--top flex flex-row justify-end pa1 f7" style="background-color:${selectedRecipe.colors[selectedRecipe.selectedColor]}">edit</div>

        <!--Recipe header -->
        <section>
          <h3>
            ${selectedRecipe.title} 
            <small class="f7">(${recipeBranch.branchName})</small>
          </h3>
          <p class="f7">${'#'} High-Fives · ${'#'} Forks · ${'#'} Followers · Download/Share </p>
          <p>${selectedRecipe.description}</p>
        </section>

        <!-- Link list -->
        ${this.linkList(selectedRecipe, recipeBranch)}

      </fieldset>
      ${addRecipeButton(this.state, this.emit, this.id, this.branch)}
    </section>
    `
  }

  recipeList(projectBranch){

    return html`
      <section>
        ${projectBranch.recipes.length == 0 ? addRecipeButton(this.state, this.emit, this.project._id, projectBranch.branchName) : ""}
        
        ${projectBranch.recipes.map( (recipe, recipeIndex) =>  {
          
          let selectedRecipe = recipe.recipe;
          let recipeBranch = selectedRecipe.branches.find( item => {
            if(item.hasOwnProperty("branchName")){
              return item.branchName == recipe.selectedBranch
            } else {
              return item.branchName == "default";
            }
          });

          return this.recipeItem(selectedRecipe, recipeBranch, recipeIndex);
        })}
      </section>
    `
  }

  linkItem(selectedLink, selectedRecipe, recipeBranch){
    const {link, branchName} = selectedLink
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
        ${addLinkButton(this.state, this.emit, selectedRecipe._id, recipeBranch.branchName)}
      </section>
    `
  }

  linkList(selectedRecipe, recipeBranch){
    return html`
      <section>

        <!-- add link button if no links exist in the recipe -->
        ${recipeBranch.links.length == 0 ? addLinkButton(this.state, this.emit, selectedRecipe._id, recipeBranch.branchName) : ""}

        <!-- map links -->
        ${
          recipeBranch.links.map( (link) => {
            let selectedLink = link.link;
            return this.linkItem(selectedLink, selectedRecipe, recipeBranch);
          })
        }

      </section>
    `
  }

  createElement () {

    if(this.project === undefined){
      const query  = {"query": {"$or": [
        {"owner": this.user},
        {"collaborators":[this.user]}
      ]}}

      this.emit(this.state.events.projects_find, query);
      return html`<div>fetching data</div>`

    } else {

      this.projectBranch = this.project.branches.find(item => {
        return item.branchName == this.branch
      })

      this.emit(this.state.events.addRecipeModal_selectProjectId, this.project._id);
      this.emit(this.state.events.addRecipeModal_selectProjectBranchName, this.branch);
      
      return html`
        <div class="w-100 h-100">

          <!-- Project header -->
          ${this.projectHeader(this.project)}

          <!-- Recipe list -->
          ${this.recipeList(this.projectBranch)}
        </div>
      `
    }
  }

  update () {
    return true
  }
}


module.exports = Project