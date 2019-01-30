var html = require('choo/html')

module.exports = BranchControlMenu;

function newBranchBtn(state, emit, selected){
    // create new branch input
    return html`
    <form class="w-20 flex flex-row h2 items-center">
        <input class="h2 w-100 bn br2 br--right bg-silver f7" type="submit" value="new branch">
    </form>
    `
}

function branchSelector(state, emit, selected){
    return html`
        <select class="w-80 mb2 h2 ba br2 br--left bn ma0 pl2 pr2">
            ${
            selected.branches.map( item => {
                return html`
                <option class="w-100 h2 bn br2 ma0" value="${item.branchName}">${item.branchName}</option>
                `
            })
            }
        </select>
    `
}

function branchNameChanger(state, emit, selected){
    return html`
    <div class="mt2 mb2">
      <p class="ma0 mr4">Change Branch Name:</p>
      <form data-branchid="" onsubmit="">
        <input class="bn br2 br--left bg-moon-grey pa2 h2" name="branchName" type="text" value="">
        <input class="bn br2 br--right ma0 h2 bg-silver" type="submit" value="change name">
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
        document.querySelector("#dangerZone").classList.toggle("dn");
    }
    return html`
    <div>
        <p onclick=${toggleDangerZone}>⚠️ Danger Zone ▼ </p>
        <div id="dangerZone" class="dn">
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
                ${branchSelector(state, emit, selected)}
                <!-- create new branch input -->
                ${newBranchBtn(state, emit, selected)}
            </div>
            <!-- change name -->
            ${branchNameChanger(state, emit, selected)}
            <!-- danger zone -->
            ${dangerZone(state, emit, selected)}
            
        </fieldset>
        
        `

    
}