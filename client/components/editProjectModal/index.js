var html = require('choo/html')

const CloseModalBtn = require('./closeModalBtn');
const BranchControlMenu = require('./BranchControlMenu');
const ProjectDetailsMenu = require('./ProjectDetailsMenu');

module.exports = EditProjectModal;

function checkDisplay(state, emit){
    if(state.editProjectModal.display == true){
        return ""
    } else{
        return "dn"
    }
}



function EditProjectModal(state, emit){
    const {selected, id, branch} = state.current.projects;

    if(Object.keys(selected).length > 0 ){
        return html`
            <div id="editProjectModal" class="w-100 h-100 fixed ${checkDisplay(state, emit)}" style="background-color:rgba(0, 27, 68, 0.5)">
                <div class="w-100 h-100 flex flex-column justify-center items-center pa2">
                    <div class="mw7 w-100 h-auto overflow-auto ba br2 bg-light-gray pt2 pb4 pl4 pr4">
                        <div class="w-100 flex flex-row justify-between">
                            <h2>Edit Project</h2>
                            ${state.cache(CloseModalBtn, "CloseProjectModalBtn", state, emit).render()}
                        </div>
                        <!-- main project modal area -->
                        <section>
                            ${new BranchControlMenu(state, emit, selected)}
                            ${new ProjectDetailsMenu(state, emit, selected)}
                        </section>
                        
                    </div>
                </div>
            </div>
            `
    } else{
        return html`<div>fetching data</div>`
    }

    
}


  