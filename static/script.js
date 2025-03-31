// code voor listJS in favorieten en resultaten

// grid-view en list-view

console.log('dit wordt uitgevoerd na het laden van de pagina')


const optionGrid = document.querySelector('#view-grid');
const optionList = document.querySelector('#view-list');
let deLijst = document.querySelector('ul');

optionGrid.addEventListener('change', showInGrid);
optionList.addEventListener('change', showInList);

function showInGrid() {
    deLijst.classList.remove('list-view');
    console.log('classlist list is removed');

    deLijst.classList.add('grid-view');
    console.log('classlist grid has been added');
}

function showInList() {
    deLijst.classList.remove('grid-view');
    console.log('classlist grid is removed');

    deLijst.classList.add('list-view');
    console.log('classlist list has been added');
}





