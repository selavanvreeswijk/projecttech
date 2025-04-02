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

// document.addEventListener("DOMContentLoaded", function(){
//     document.querySelectorAll(".sort-span").addEventListener("click", function() {
//         this.style.backgroundImage = "var(--color-logo)"; 
        
//         // Verandert de kleur permanent
//         let colorValue = '#fdf9eb';
    
//         // Pas de kleur toe op sort-label
//         document.querySelectorAll('.sort-label').style.color = colorValue;
    
//       });
// });

document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll(".sort-span").forEach(span => {
        span.addEventListener("click", function() {
            // Reset de achtergrondafbeelding van alle spans (na het instellen van de achtergrond voor de geklikte span)
            document.querySelectorAll(".sort-span").forEach(s => s.style.backgroundImage = "");

            // Verandert de achtergrondafbeelding van de geklikte span
            this.style.backgroundImage = "var(--color-logo)"; 

            // Verandert de kleur van het label naar de gewenste kleur
            let colorValue = '#fdf9eb';
            let borderRadiusValue = '.5em';

            

            // Zoek het juiste label binnen de geklikte span
            let label = this.querySelector('.sort-label');
            if (label) {
                // Reset de kleur van alle labels naar de standaardkleur
                document.querySelectorAll(".sort-label").forEach(l => l.style.color = "");

                // Verander de kleur van het geselecteerde label
                label.style.color = colorValue;
            } else {
                console.error("Label niet gevonden in span:", this);
            }

            this.style.borderRadius = borderRadiusValue;
        });
    });
});

// document.addEventListener("DOMContentLoaded", function() {
//     document.querySelectorAll(".sort-span").forEach(span => {
//         span.addEventListener("click", function() {
//             this.style.backgroundImage = "var(--color-logo)"; 
            
//             // Verandert de kleur permanent
//             let colorValue = '#fdf9eb';

//             // Zoek het juiste label binnen de geklikte span
//             let label = this.querySelector('.sort-label');
//             if (label) {
//                  // Reset de achtergrondafbeelding van alle spans
//             document.querySelectorAll(".sort-span").forEach(s => s.style.backgroundImage = "");

//             // Reset de kleur van alle labels naar de standaardkleur
//             document.querySelectorAll(".sort-label").forEach(l => l.style.color = "");

//                 label.style.color = colorValue;
//             } else {
//                 console.error("Label niet gevonden in span:", this);
//             }
//         });
//     });
// });

//   document.getElementById("sort-label").addEventListener("click", function() {
//     this.style.backgroundImage = "var('--color-icons-not-filled')";
//   });





