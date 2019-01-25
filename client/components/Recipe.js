var Component = require('choo/component')
var html = require('choo/html')

const addLinkButton = require('./addLinkButton');

class Recipe extends Component {
  constructor (id, state, emit) {
    super(id)

    this.state = state;
    this.emit = emit;

    // set recipe params
    this.collection = state.params.collection;
    this.user = state.params.user;
    this.id = state.params.id;
    this.branch = state.params.branch;

    this.recipe = state[this.collection].find(item => {
      return item._id === this.id;
    });

    this.recipeBranch = {};

    this.local = state.components[id] = {}

    this.recipeHeader = this.recipeHeader.bind(this);
    this.linkItem = this.linkItem.bind(this);
    this.linkList = this.linkList.bind(this);
  }

  

  recipeHeader(feature){
    return html`
    <section class="mb4">
      <p class="w-100 flex flex-row justify-start items-center"><small class="f7">recipe</small> · <small>edit</small></p>
      <h2>${feature.title}
      <small class="f7"> (${feature.selectedBranch})</small>
      </h2>
      <p class="f7">${'#'} High-Fives · ${'#'} Forks · ${'#'} Followers · Download/Share </p>
      <p>${feature.description}</p>
      <ul class="list pl0"></ul>
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
    if(this.recipe === undefined){
      const query  = {"query": {"$or": [
        {"owner": this.user},
        {"collaborators":[this.user]}
      ]}}

      this.emit(this.state.events.recipes_find, query);
      return html`<div>fetching data</div>`

    } else {

      this.recipeBranch = this.recipe.branches.find(item => {
        return item.branchName == this.branch
      })

      // this.emit(this.state.events.addLinkModal_selectRecipeId, this.recipe._id);
      // this.emit(this.state.events.addLinkModal_selectRecipeBranchName, this.branch);
      
      return html`
        <div class="w-100 h-100">

          <!-- Project header -->
          ${this.recipeHeader(this.recipe)}

          <!-- Link list -->
          ${this.linkList(this.recipe, this.recipeBranch)}
        </div>
      `
    }
  }

  update () {
    return true
  }
}

module.exports = Recipe