
const html = require('choo/html');

module.exports = BranchSelector;

function BranchSelector(state, emit, selected){
    
    function setSelectedBranch(state, emit, selected){
        return e => {
            e.preventDefault();
            const updatedBranchName = e.currentTarget.value
            emit(state.events.recipes_setSelectedBranch, {updatedBranchName})
        }
        
      }

    function branchIsSelected(state, emit, item){
        if(item.branchName == state.current.recipes.selected.selectedBranch){
            return ' selected '
        } else {
            return ''
        }
    }

    return html`
        <select class="w-80 mb2 h2 ba br2 br--left bn ma0 pl2 pr2" onchange=${setSelectedBranch(state, emit, selected)}>
            ${
            selected.branches.map( item => {
                return html`
                <option selected=${branchIsSelected(state, emit, item)} class="w-100 h2 bn br2 ma0" value="${item.branchName}">${item.branchName}</option>
                `
            })
            }
        </select>
    `
}