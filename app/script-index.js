/* Page VS ORDI : bouton toogle switch
document.addEventListener('DOMContentLoaded', function () {
  var checkbox = document.querySelector('input[type="checkbox"]');

  checkbox.addEventListener('change', function () {
    if (checkbox.checked) {
      // do this
      console.log('Checked');
    } else {
      // do that
      console.log('Not checked');
    }
  });
});
 */

// CHOIX BOUTON RADIO & EVENEMENT SUBMIT SELON CHOIX
let formChoiceOpponent = document.querySelector('form');
let btnRadio = document.querySelectorAll('input[type="radio"]');
let isOpponentFriend = true;

btnRadio.forEach((btnRadio) => {
    btnRadio.addEventListener('change', function (event) {
        isOpponentFriend = event.target.id === "friend"
    });
})

btnRadio[0].checked = isOpponentFriend;

formChoiceOpponent.addEventListener('submit', (event) => {
    event.preventDefault()
    if (isOpponentFriend) {
        document.location.href = "vs-ami-a-cote.html";
    } else {
        document.location.href = "vsordi.html";
    }

})

