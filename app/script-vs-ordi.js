const validateChoiceFirstPlayer = document.getElementById('validateChoiceFirstPlayer');

validateChoiceFirstPlayer.addEventListener('click', submit);

function submit() {
    const checkbox = document.querySelector('input[type="checkbox"]');
    redirectToGame("X", "Pifomètre", "blue", "orange", checkbox.checked);
}
