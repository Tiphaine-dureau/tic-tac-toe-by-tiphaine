//Gestion des inputs text : name

let usernameX = document.getElementById('name-x');
let usernameO = document.getElementById('name-o');
let validationForm = document.getElementById('validationForm');

validationForm.addEventListener('click', f_valid);
function f_valid(event){
    event.preventDefault();
    if(usernameX.validity.valueMissing){
        alert('Veuillez indiquer le prénom du joueur X');
        return;
    }
    if(usernameO.validity.valueMissing){
        alert('Veuillez indiquer le prénom du joueur O');
        return;
    }
    // Formulaire valide => ouvre la page board-game avec les username dans l'url
    console.log(usernameX.value);
    console.log(usernameO.value);
    window.location.href = `board-game.html?usernameX=${usernameX.value}&usernameO=${usernameO.value}&colorListX=${colorListX.value}&colorListO=${colorListO.value}`;
}

//Gestion des listes déroulantes

let colorListX = document.getElementById("choice-color-x");
let colorListO= document.getElementById('choice-color-o');

colorListX.addEventListener('change', function (eventX){
console.log(`${eventX.target.name}: ${eventX.target.value}`)
});

colorListO.addEventListener('change', function (eventO){
    console.log(`${eventO.target.name}: ${eventO.target.value}`)
});


