//PAGE VS AMI(E) A COTE

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
    // VALID FORM
    console.log(usernameX.value);
    console.log(usernameO.value);
    window.location.href = `board-game.html?usernameX=${usernameX.value}&usernameO=${usernameO.value}`;
}




