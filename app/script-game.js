// Charger les informations du jeu
const status = document.querySelector(".display-player-turn");
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
const playerTurn = () => `Tour de ${activePlayer}`;

//Récupération données username de l'URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const usernameX = urlParams.get('usernameX');
const usernameO = urlParams.get('usernameO');
let activePlayer = usernameX;

//Récupération données couleurs de l'URL
const choiceColorX = urlParams.get('colorListX');
const choiceColorO = urlParams.get('colorListO');
let xColor;
let oColor;

const colorsMap = {
    "red": "#F67FB8",
    "orange" : "#F99865",
    "yellow": "#FDFFA5",
    "green" : "#B6D881",
    "blue" : "#8DEEFF",
    "purple": "#A285E1",
}

xColor = colorsMap[choiceColorX];
oColor = colorsMap[choiceColorO];

//Indique dynamiquement qui est le joueur qui joue sur la page
status.innerHTML = playerTurn();

// Créer pour chaques cases un évènement au clic
document.querySelectorAll(".box").forEach(cell => cell.addEventListener("click", () => clickbox(cell)));
// Crer un évènement au click pour le bouton recommencer
document.querySelector(".start-again").addEventListener("click", startAgain);


function clickbox(cell) {
    //récupère l'index de la case cliquée
    const cellId = cell.getAttribute("id");
    document.getElementById(cellId).style.color = activePlayer === usernameX ? xColor : oColor;
    const cellIndex = parseInt(cellId.substr(3, 1));
    // Vérifier si il y a déjà un élement sur la case ou que le jeu n'est pas actif
    if (boxStatus[cellIndex] !== "" || !activeGame) {
        return
    }
    const cellValue = activePlayer === usernameX ? 'X' : 'O';
    boxStatus[cellIndex] = cellValue;
    cell.innerHTML = cellValue;

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
    //Gestion de tour gagnant
    if (winTour) {
        status.innerHTML = winGame()
        activeGame = false;
        return
    }

    //Gestion de l'égalité
    if (!boxStatus.includes("")) {
        status.innerHTML = equality()
        activeGame = false;
        return
    }
    //Gestion du changement de joueur
    activePlayer = activePlayer === usernameX ? usernameO : usernameX;
    status.innerHTML = playerTurn();
}

function startAgain() {
    activePlayer = usernameX;
    activeGame = true;
    boxStatus = ["", "", "", "", "", "", "", "", ""];
    status.innerHTML = playerTurn();
    document.querySelectorAll(".box").forEach(cell => cell.innerHTML = "");
}

// Création alert pour afficher les règles sur boutton ?
let modalRules = document.getElementById("modal-rules")

function appearModal() {
    alert("Le but du jeu est d'aligner avant son adversaire 3 symbôles identiques horizontalement, verticalement ou en diagonale")
}

modalRules.addEventListener('click', appearModal)