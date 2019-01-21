var Component = require('choo/component')
var html = require('choo/html')

const addLinkButton = require('./addLinkButton');

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

    this.feature = state[this.collection].find(item => {
      return item._id === this.id;
    });

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
      <h2>${feature.title}</h2>
      <p class="f7">${'#'} High-Fives · ${'#'} Forks · ${'#'} Followers · Download/Share </p>
      <p>${feature.description}</p>
      <ul class="list pl0"></ul>
    </section>
    `
  }

  recipeItem(selectedRecipe){
    return html`
    <section class="mb2 mt2">
      <fieldset class="w-100 ba br2" dataset-id="${selectedRecipe._id}" dataset-db="${selectedRecipe.featureType}">
      
        <!-- Recipe order -->
        <legend class="ba br-pill pl1 pr1">Recipe #${idx}</legend>
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
        
      </fieldset>
    </section>
    `
  }

  recipeList(){
    return html`
    
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
    if(this.feature === undefined){
      let query = {"query": {"$or": [
        {"owner": user},
        {"collaborators":[this.user]}
      ]}}
      // console.log(query);
      this.emit(this.state.events.projects_find, query)
      return html`<div>fetching data</div>`
    } else{
      // console.log(feature);
      let selectedBranch = this.feature.branches.find(item => {
        return item.branchName == 'default'
      })

      //!!! TODO: get branchName from query params!!!
      this.emit(this.state.events.addRecipeModal_selectProjectId, this.feature._id);
      this.emit(this.state.events.addRecipeModal_selectProjectBranchName, selectedBranch.branchName);
      


      return html`
        <div class="w-100 h-100">

          <!-- Project header -->
          ${projectHeader(this.feature)}

          <!-- Recipe list -->

        </div>
      `
    }
  }

  update () {
    return true
  }
}


module.exports = Project