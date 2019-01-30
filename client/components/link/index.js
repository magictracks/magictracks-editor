var html = require('choo/html')

const LinkHeader = require('./linkHeader');

module.exports = Link;

function Link(state, emit, _selected, _idx){
    let selected;

    if(_selected){
        selected = _selected;
    } else{
        selected = state.current.links.selected;
    }


    let linkUniqueName = `LinkHeader_${selected.uniqueName}`
    return html`
        <section class="mb2 mt2">
            <div class="w-100 flex flex-column br2 ba">
                <!-- LINK HEADER -->
                ${state.cache(LinkHeader, linkUniqueName, state, emit).render(selected)}

                <!-- LINK HEADER -->
                <section class="w-100 flex flex-row pl4 pr4 pt2 pb2 items-center f7">
                    <div class="w2 h2 mr4" style="background-color:${selected.colors[selected.selectedColor]}"></div>
                    <div class="w-100 flex flex-row pa2 items-start f7"> 
                        <div class="w-40 flex flex-column">
                            <p class="ma0">${selected.title}</p>
                            <small>${selected.url}</small>
                        </div>
                        <div class="w-60"><p class="mt0">${selected.description}</p></div>
                    </div>
                </section>
            </div>
        </section>
    `
}
