// code voor listJS in favorieten en resultaten

// grid-view en list-view?

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


// sorteer en filtreer button
// .hidden wordt aan/uit gezet

document.getElementById('sort-btn').addEventListener('click', function () {
    document.getElementById('sort-options').classList.toggle('hidden');
});

// dropdown weg wanneer je hier buiten klikt

document.addEventListener('click', function (event){
    const sortOptions = document.getElementById('sort-options');
    const sortButton = document.getElementById('sort-btn');

    if (!sortButton.contains(event.target) && !sortOptions.contains(event.target)){
        sortOptions.classList.add('hidden');
    }
});

document.getElementById('filter-btn').addEventListener('click', function () {
    document.getElementById('filter-options').classList.toggle('hidden');
});

document.addEventListener('click', function (event){
    const filterOptions = document.getElementById('filter-options');
    const filterButton = document.getElementById('filter-btn');

    if (!sortButton.contains(event.target) && !sortOptions.contains(event.target)){
        sortOptions.classList.add('hidden');
    }
});