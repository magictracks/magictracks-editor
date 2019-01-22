var Component = require('choo/component')
var html = require('choo/html')
const css = require('sheetify');

css`
textarea { resize: vertical; }
`


class EditProjectModal extends Component {
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

    this.checkDisplay = this.checkDisplay.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.createBranch = this.createBranch.bind(this);
    this.changeBranchName = this.changeBranchName.bind(this);
    this.setSelectedBranch = this.setSelectedBranch.bind(this);
    this.branchIsSelected = this.branchIsSelected.bind(this);
  }


  closeModal(e){
    console.log('close edit project modal');
    this.emit(this.state.events.editProjectModal_close)
  }

  checkDisplay(){
    if(this.state.editProjectModal.display == true){
      return ""
    } else{
      return "dn"
    }
  }

  createBranch(e){
    console.log("create new branch!");
    e.preventDefault();
    this.emit(this.state.events.projects_createBranch, {})
  }

  changeBranchName(e){
    console.log("changing branch name!");
    e.preventDefault();
    let formData = new FormData(e.currentTarget);

    let payload = {
      updatedBranchName: formData.get("branchName"),
      updatedBranchId: e.currentTarget.dataset.branchid
    }

    this.emit(this.state.events.projects_changeBranchName, payload)
  }

  setSelectedBranch(e){
    e.preventDefault();
    const updatedBranchName = e.currentTarget.value
    this.emit(this.state.events.projects_setSelectedBranch, {updatedBranchName})
  }

  branchIsSelected(item){

    if(item.branchName == this.state.params.branch){
      return ' selected '
    } else {
      return ''
    }
  }



  createElement () {

      const currentProject = this.state.editProjectModal.project;
      let selectedBranch;
      
     
      if(Object.keys(currentProject).length > 0){
      
      
      selectedBranch = currentProject.branches.find(branch => {
        return branch.branchName == this.state.params.branch;
      });

      return html`
      <div id="editProjectModal" class="w-100 h-100 fixed ${this.checkDisplay()}" style="background-color:rgba(0, 27, 68, 0.5)">
        <div class="w-100 h-100 flex flex-column justify-center items-center">
          <div class="mw7 w-100 h-auto ba br2 bg-light-gray pt2 pb4 pl4 pr4">
            <div class="w-100 flex flex-row justify-between">
              <h2>Edit Project</h2>
              <button class="bn f2 bg-light-gray" onclick=${this.closeModal}>✕</button>
            </div>
            <section class="w-100">
            <fieldset class="w-100 ba br2 mb2">
              <legend class="br-pill pl2 pr2 ba">Selected Branch</legend>
              
              <div class="w-100 flex flex-row">
                <select class="w-80 mb2 h2 ba br2 br--left bn ma0 pl2 pr2" onchange=${this.setSelectedBranch}>
                  ${
                    currentProject.branches.map( item => {
                      return html`
                        <option selected="${this.branchIsSelected(item)}" class="w-100 h2 bn br2 ma0" value="${item.branchName}">${item.branchName}</option>
                      `
                    })
                  }
                </select>
                <!-- create new branch input -->
                <form class="w-20 flex flex-row h2 items-center" onsubmit=${this.createBranch}>
                    <input class="h2 w-100 bn br2 br--right bg-silver f7" type="submit" value="new branch">
                </form>
              </div>
              <!-- change name -->
                <div class="mt2 mb2">
                  <p class="ma0 mr4">Change Branch Name:</p>
                  <form data-branchid="${selectedBranch._id}" onsubmit=${this.changeBranchName}>
                    <input class="bn br2 br--left bg-moon-grey pa2 h2" name="branchName" type="text" value="${selectedBranch.branchName}">
                    <input class="bn br2 br--right ma0 h2 bg-silver" type="submit" value="change name">
                  </form>
                </div>
            </fieldset>
            <hr>

              <!-- edit project details form --> 
              <form class="w-100 mt2">
                <fieldset class="w-100 mb2 br2 ba">
                  <legend class="br-pill pl2 pr2 ba">title</legend>
                  <input class="h2 w-100 mr2 bn br2 pa2" type="text" name="title" value="${currentProject.title}">
                </fieldset>
                <fieldset class="w-100 mb2 br2 ba">
                  <legend class="br-pill pl2 pr2 ba">description</legend>
                  <textarea class="h4 w-100 mr2 bn br2 pa2" type="text" name="description">${currentProject.description}</textarea>
                </fieldset>
                <fieldset class="w-100 mb2 br2 ba">
                  <legend class="br-pill pl2 pr2 ba">collaborators</legend>
                  <ul>
                    ${
                      currentProject.collaborators.map(collaborator => {
                        return html`
                          <li class="flex flex-row justify-between">
                            <p>${collaborator}</p>
                            <button onclick=${() => {console.log("remove collaborator")}}>✕</button>
                          </li>
                        `
                      })
                    }
                  </ul>

                  <!-- create new branch input -->
                  <div class="w-100">
                    <form class="flex flex-row h2 items-center" onsubmit=${(e) => {e.preventDefault(); console.log("add new collaborator!") }}>
                      <input class="h2 w-80 mr2 bn br2 pa2" type="text" placeholder="e.g. @shiffman">
                      <input class="h2 w-20 bn br2 bg-moon-grey f7" type="submit" value="add collaborator">
                    </form>
                  </div>
                </fieldset>
              </form>
              <!-- cancel or save buttons -->
              <section class="w-100 mt3 flex flex-row justify-between">
                  <div><button class="bg-light-red bn br2 h3 pa2" onclick=${() => {console.log("delete")} }>🗑 delete</button></div>
                  <div>
                    <button class="bg-light-silver bn br2 h3 mr2 pa2" onclick=${this.closeModal}>Cancel</button>
                    <button class="bg-light-green bn br2 h3 pa2" onclick=${() => { console.log("save edits!")}}>Save</button>
                  </div>
              </section>
            </section>
          </div>
        </div>
      </div>

      `
      } else{
        return html`
          <div></div>
        `
      }
  }

  update () {
    return true
  }
}

module.exports = EditProjectModal