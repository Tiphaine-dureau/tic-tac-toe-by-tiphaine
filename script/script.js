// Charger les informations du jeu
const status = document.querySelector(".display-player-turn");
let activePlayer = "x";
let activeGame = true;
let boxStatus = ["", "", "", "", "", "", "", "", ""];

const casesForWin = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

//Messages à afficher
const winGame = () => `${activePlayer} gagne !`;
const lostGame = () => `Vous avez perdu =(`;
const equality = () => "Égalité ! ";
const playerTurn = () => ` Tour de ${activePlayer}`;

//Indique dynamiquement qui est le joueur qui joue sur la page
status.innerHTML = playerTurn();

// Créer pour chaques cases un évènement au clic
document.querySelectorAll(".box").forEach(cell => cell.addEventListener("click", () => clickbox(cell)));
// Crer un évènement au click pour le bouton recommencer (pour l'instant l'affiche dans la console)
document.querySelector(".restart-button").addEventListener("click", () => console.log("restart"));


function clickbox(cell) {
    //récupère l'index de la case cliquée
    const cellId = cell.getAttribute("id");
    const cellIndex = parseInt(cellId.substr(3, 1));
    console.log(cellIndex);
    // Vérifier si il y a déjà un élement sur la case ou que le jeu n'est pas actif
    if (boxStatus[cellIndex] !== "" || !activeGame) {
        return
    }
    boxStatus[cellIndex] = activePlayer;
    cell.innerHTML = activePlayer;

    checkWin();
}

function checkWin() {
    let winTour = false;
    for (let caseForWin of casesForWin) {
        let value1 = boxStatus[caseForWin[0]]
        let value2 = boxStatus[caseForWin[1]]
        let value3 = boxStatus[caseForWin[2]]
        if (value1 === "" || value2 === "" || value3 === "") {
            continue
        }
        if (value1 === value2 && value2 === value3) {
            winTour = true;
            break
        }
    }
    //Si on est sur un tour gagnant et si oui affiche dynamiquement le joueur gagnant et désactive le jeu
    if (winTour) {
        status.innerHTML = winGame()
        activeGame = false;
        return
    }

    if (!boxStatus.includes("")) {
        status.innerHTML = equality()
        activeGame = false;
        return
    }
    activePlayer = activePlayer === "x" ? "o" : "x"
    status.innerHTML = playerTurn();
}
// ARRET 26MIN VIDÉO
