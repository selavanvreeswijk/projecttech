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

// Pop-up log in to add to favorites
const addToFavorites = document.querySelector('.favorite-btn'); 
const popupBackground = document.querySelector('.popup-background');
const logInToaddButton = document.querySelector('.popup-buttons button:last-of-type');
const skipLogInButton = document.querySelector('.popup-buttons button:first-of-type');


     
     addToFavorites.addEventListener('click', async function (event){
            event.preventDefault();  

            const response = await fetch('/check-login');
            const data = await response.json();

            if (!data.loggedIn){
                popupBackground.style.display = 'flex';

                 // Disable scrolling
            document.body.style.overflow = 'hidden'; 
            document.documentElement.style.overflow = 'hidden';  

            } else{
                //fetch request om plant aan favs toe te voegen
            }
 
           
        });

        logInToaddButton.addEventListener('click', function (){
            popupBackground.style.display = 'none'; 

            document.body.style.overflow = 'auto';  
            document.documentElement.style.overflow = 'auto';  
        });

        skipLogInButton.addEventListener('click', function (){
            window.location.href = '/results';
        });




