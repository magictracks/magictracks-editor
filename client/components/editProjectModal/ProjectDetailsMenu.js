var html = require('choo/html')

module.exports = ProjectDetailsMenu;

function titleInput(state, emit, selected){
    return html`
    <fieldset class="w-100 mb2 br2 ba">
        <legend class="br-pill pl2 pr2 ba">title</legend>
        <input class="h2 w-100 mr2 bn br2 pa2" type="text" name="title" value="${selected.title}">
    </fieldset>
    `
}
function descriptionInput(state, emit, selected){
    return html`
    <fieldset class="w-100 mb2 br2 ba">
            <legend class="br-pill pl2 pr2 ba">description</legend>
            <textarea class="h4 w-100 mr2 bn br2 pa2" type="text" name="description">${selected.description}</textarea>
    </fieldset>
    `
}
function collaboratorsInput(state, emit, selected){
    return html`
    <fieldset class="w-100 mb2 br2 ba">
        <legend class="br-pill pl2 pr2 ba">collaborators</legend>
        <ul>
            ${
                selected.collaborators.map(collaborator => {
                return html`
                <li class="flex flex-row justify-between">
                    <p>${collaborator}</p>
                    <button onclick=${() => {console.log("remove collaborator")}}>✕</button>
                </li>
                `
            })
            }
        </ul>
        <!-- add collaborator form -->
        <div class="w-100">
            <form class="flex flex-row h2 items-center" onsubmit=${(e) => {e.preventDefault(); console.log("add new collaborator!") }}>
            <input class="h2 w-80 mr2 bn br2 pa2" type="text" placeholder="e.g. @shiffman">
            <input class="h2 w-20 bn br2 bg-light-purple f7" type="submit" value="add collaborator">
            </form>
        </div>
    </fieldset>
    `
}

function deleteProjectBtn(state, emit, selected){

    function deleteProject(state, emit, selected){
        return e => {
            e.preventDefault();
            const payload = {
                projectId: selected._id
            }
            console.log("delete this project",payload);
            emit(state.events.projects_deleteProject, payload);
            emit(state.events.editProjectModal_close);
        }
    }

    return html`
    <button class="bg-light-red bn br2 h3 pa2" onclick=${deleteProject(state, emit, selected)}>🗑 delete entire project</button>
    `
}

function formSubmissionBtnGroup(state, emit, selected){
    return html`
    <section class="w-100 mt3 flex flex-row justify-between mb4">
        <!-- TODO: add confirm() --> 
        <div>${deleteProjectBtn(state, emit, selected)}</div>
        <div>
            <button class="bg-light-silver bn br2 h3 mr2 pa2" onclick="">Cancel</button>
            <input class="bg-light-green bn br2 h3 pa2" type="submit" form="projectDetailsForm" value="save" />
        </div>
    </section>
    `
} 

function ProjectDetailsMenu(state, emit, selected){

    function saveProjectDetails(state, emit, selected){
        return e => {
            e.preventDefault()
            let form = new FormData(e.currentTarget);
        
            let payload = {
              title: form.get("title"),
              description: form.get("description")
            }
        
            emit(state.events.projects_updateDetails, payload)
            emit(state.events.editProjectModal_close)
        }
       
    
      }

    return html`
    <form id="projectDetailsForm" class="w-100 mt2" onsubmit=${saveProjectDetails(state, emit, selected)}>
        ${titleInput(state, emit, selected)}
        ${descriptionInput(state, emit, selected)}
        ${collaboratorsInput(state, emit, selected)}
        ${formSubmissionBtnGroup(state, emit, selected)}
    </form>
    `
}