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



const sortButton = document.getElementById('sort-btn');
const sortOptions = document.getElementById('sort-options');
const filterButton = document.getElementById('filter-btn');
const filterOptions = document.getElementById('filter-options');

const sortPaths = sortButton.querySelectorAll('svg path');
const filterIcon = filterButton.querySelector('svg path');


// Toggle voor sorteren
sortButton.addEventListener('click', function (event) {
    event.stopPropagation();
    sortOptions.classList.toggle('hidden');
    sortButton.classList.toggle('active');
    sortPaths.forEach(path => path.classList.toggle('active')); 

    filterOptions.classList.add('hidden');
    filterButton.classList.remove('active');
    filterIcon.classList.remove('active');
});

// Toggle voor filteren
filterButton.addEventListener('click', function (event) {
    event.stopPropagation();
    filterOptions.classList.toggle('hidden');
    filterButton.classList.toggle('active');
    filterIcon.classList.toggle('active'); 

    sortOptions.classList.add('hidden');
    sortButton.classList.remove('active');
    sortPaths.forEach(path => path.classList.remove('active'));
});

// Klik buiten een dropdown om deze te sluiten
document.addEventListener('click', function (event) {
    if (!sortButton.contains(event.target) && !sortOptions.contains(event.target)) {
        sortOptions.classList.add('hidden');
        sortButton.classList.remove('active');
        sortPaths.forEach(path => path.classList.remove('active'));
    }
    if (!filterButton.contains(event.target) && !filterOptions.contains(event.target)) {
        filterOptions.classList.add('hidden');
        filterButton.classList.remove('active');
        filterIcon.classList.remove('active');
    }
});