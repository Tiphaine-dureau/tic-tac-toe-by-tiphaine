let usernameX = document.getElementById('name-x');
let usernameO = document.getElementById('name-o');
let validationForm = document.getElementById('validationForm');

validationForm.addEventListener('click', formValidation);

/**
 * Vérifie les données du formulaire avant envoi
 * @param event
 */
function formValidation(event){
    event.preventDefault();
    if(usernameX.validity.valueMissing){
        alert('Veuillez indiquer le prénom du joueur X');
        return;
    }
    if(usernameO.validity.valueMissing){
        alert('Veuillez indiquer le prénom du joueur O');
        return;
    }
    if(usernameX.value === usernameO.value){
        alert('Veuillez choisir des prénoms différents');
        return;
    }
    // Formulaire valide => ouvre la page board-game avec les username et les couleurs dans l'url
    redirectToGame(usernameX.value, usernameO.value, colorListX.value, colorListO.value);
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


