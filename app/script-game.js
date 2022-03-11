/**
 * ######################
 * # GLOBAL VARIABLES   #
 * ######################
 */
let status;
let activeGame = true;
let boxStatus = ["", "", "", "", "", "", "", "", ""];
let usernameX;
let usernameO;
let activePlayer;
let choiceColorO;
let choiceColorX;
let xColor;
let oColor;

/**
 * ######################
 * # FONCTIONS          #
 * ######################
 */

/**
 * Affiche dynamiquement le joueur actif
 */
function setPlayerTurnLabel() {
    status.innerHTML = `Tour de ${activePlayer}`;
}

/**
 * Gères les affichages du DOM
 */
function handleDom() {
    // Charger les informations du jeu
    status = document.querySelector(".display-player-turn");
    // Créer pour chaques cases un évènement au clic
    document.querySelectorAll(".box").forEach(cell => cell.addEventListener("click", () => clickBox(cell)));
    // Crer un évènement au click pour le bouton recommencer
    document.querySelector(".start-again").addEventListener("click", startAgain);
    const modalRules = document.getElementById("modal-rules");
    modalRules.addEventListener('click', appearModal);
}

/**
 * Récupère les données de l'url (couleurs et noms des joueurs)
 */
function saveUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    usernameX = urlParams.get('usernameX');
    usernameO = urlParams.get('usernameO');
    choiceColorX = urlParams.get('colorListX');
    choiceColorO = urlParams.get('colorListO');
}

/**
 * Assigne la couleur choisi aux joueurs
 */
function setPlayerColors() {
    const colorsMap = {
        "red": "#F67FB8",
        "orange": "#F99865",
        "yellow": "#FDFFA5",
        "green": "#B6D881",
        "blue": "#8DEEFF",
        "purple": "#A285E1",
    }
    xColor = colorsMap[choiceColorX];
    oColor = colorsMap[choiceColorO];
}

/**
 * Initialisation des paramètres du jeu
 */
function init() {
    handleDom();
    saveUrlParams();
    activePlayer = usernameX;
    setPlayerColors();
    setPlayerTurnLabel();
}

/**
 * Vérifie le statut de la case et permet un click en fonction. A la fin appel une fonction pour vérifier s'il y a un gagnant ou une égalité
 * @param cell
 */
function clickBox(cell) {
    //récupère l'index de la case cliquée
    const cellId = cell.getAttribute("id");
    const cellIndex = parseInt(cellId.substr(3, 1));
    // Vérifier si il y a déjà un élement sur la case ou que le jeu n'est pas actif
    if (boxStatus[cellIndex] !== "" || !activeGame) {
        return
    }
    document.getElementById(cellId).style.color = activePlayer === usernameX ? xColor : oColor;
    const cellValue = activePlayer === usernameX ? 'X' : 'O';
    boxStatus[cellIndex] = cellValue;
    cell.innerHTML = cellValue;

    checkWin();
}

/**
 * Vérifie si les conditions pour gagner ou pour une égalité sont actives puis gère le changement de joueur
 */
function checkWin() {
    let winTour = false;
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
        status.innerHTML = `${activePlayer} gagne !`;
        status.classList.add('win-animation');
        activeGame = false;
        return
    }
    //Gestion de l'égalité
    if (!boxStatus.includes("")) {
        status.innerHTML = "Égalité !"
        activeGame = false;
        return
    }
    //Gestion du changement de joueur
    activePlayer = activePlayer === usernameX ? usernameO : usernameX;
    setPlayerTurnLabel()
}

/**
 * Recommence le jeu et réinitilisation des valeurs
 */
function startAgain() {
    activePlayer = usernameX;
    activeGame = true;
    boxStatus = ["", "", "", "", "", "", "", "", ""];
    setPlayerTurnLabel()
    document.querySelectorAll(".box").forEach(cell => cell.innerHTML = "");
    status.classList.remove('win-animation');
}

/**
 * Création alert pour afficher les règles sur boutton ?
 */
function appearModal() {
    alert("Le but du jeu est d'aligner avant son adversaire 3 symbôles identiques horizontalement, verticalement ou en diagonale")
}

/**
 * ######################
 * # INITIALISATION     #
 * ######################
 */

init();
