var html = require('choo/html')

const BranchSelector = require('./BranchSelector');

module.exports = BranchControlMenu;

function newBranchBtn(state, emit, selected){
    function submitNewBranch(state, emit, selected){
        return e =>{
            e.preventDefault();
            console.log("submitNewBranch TODO")
        }
    }
    // create new branch input
    return html`
    <form id="newBranchBtnForm" class="w-20 flex flex-row h2 items-center" onsubmit=${submitNewBranch(state, emit, selected)}>
        <input class="h2 w-100 bn br2 br--right bg-silver f7" form="newBranchBtnForm" type="submit" value="new branch">
    </form>
    `
}



function branchNameChanger(state, emit, selected){
    
    function submitChange(state, emit, selected){
        return e => {
            e.preventDefault();
            console.log("submitNameChange TODO")
        }

    }

    return html`
    <div class="mt2 mb2">
      <p class="ma0 mr4">Change Branch Name:</p>
      <form id="branchNameChangerForm" data-branchid="" onsubmit=${submitChange(state, emit, selected)}>
        <input class="bn br2 br--left bg-moon-grey pa2 h2" name="branchName" type="text" value="">
        <input class="bn br2 br--right ma0 h2 bg-silver" form="branchNameChangerForm" type="submit" value="change name">
      </form>
    </div>
    `
}

function deleteBranchBtn(state, emit, selected){
    return html`
    <button class="h2 bg-light-red pa2 bn br2">🗑 delete branch</button>
    `
}

function dangerZone(state, emit, selected){
    function toggleDangerZone(e){
        e.preventDefault();
        document.querySelector("#dangerZone").classList.toggle("dn");
    }
    return html`
        <div>
            <p onclick=${toggleDangerZone}>⚠️ Danger Zone ▼ </p>
            <div id="dangerZone" class="dn">
                ${branchNameChanger(state, emit, selected)}
                ${deleteBranchBtn(state, emit, selected)}
            </div>
        </div>
    `
}

function BranchControlMenu(state, emit, selected){

        return html`
        <fieldset class="w-100 ba br2 mb2">
            <legend class="br-pill pl2 pr2 ba">Selected Branch</legend>
            
            <div class="w-100 flex flex-row">
                <!-- branch selector -->
                ${BranchSelector(state, emit, selected)}
                <!-- create new branch input -->
                ${newBranchBtn(state, emit, selected)}
            </div>
            
            <!-- danger zone -->
            ${dangerZone(state, emit, selected)}
            
        </fieldset>
        
        `

    
}