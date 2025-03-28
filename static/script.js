// code voor listJS in favorieten en resultaten

// grid-view en list-view

console.log('dit wordt uitgevoerd na het laden van de pagina')

const optionList = document.querySelector('#view-list');
const optionGrid = document.querySelector('#view-grid');
let deLijst = document.querySelector('ul');

optionList.addEventListener('change', showInList);
optionGrid.addEventListener('change', showInGrid);


function showInList() {
    deLijst.classList.remove('grid-view');
    console.log('classlist grid is removed');

    deLijst.classList.add('list-view');
    console.log('classlist list has been added');
}

function showInGrid() {
    deLijst.classList.remove('list-view');
    console.log('classlist list is removed');

    deLijst.classList.add('grid-view');
    console.log('classlist grid has been added');
}



