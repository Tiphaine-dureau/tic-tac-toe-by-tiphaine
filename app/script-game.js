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
let vsHuman = false;
let shouldPlayerStartAgainstIA = false;
let canClick = false;

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
    if (!vsHuman && activePlayer === usernameX) {
        status.innerHTML = `À votre tour`;
    }
}

/**
 * Gères les évènements du DOM
 */
function handleDom() {
    status = document.querySelector(".display-player-turn");
    // Créer pour chaques cases un évènement au clic
    document.querySelectorAll(".box").forEach(cell => cell.addEventListener("click", () => onBoxClicked(cell)));
    // Crer un évènement au click pour le bouton recommencer
    document.querySelector(".start-again").addEventListener("click", startAgain);
    const modalRules = document.getElementById("modal-rules");
    modalRules.addEventListener('click', appearModal);
}

/**
 * Récupère les données de l'url
 */
function saveUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    usernameX = urlParams.get('usernameX');
    usernameO = urlParams.get('usernameO');
    choiceColorX = urlParams.get('colorListX');
    choiceColorO = urlParams.get('colorListO');
    shouldPlayerStartAgainstIA = urlParams.get('playerStart');
}

/**
 * Assigne la couleur choisi aux joueurs
 */
function initPlayerColors() {
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
 * Initialise le joueur actif en fonction du choix de l'utilisateur
 */
function initActivePlayer() {
    if (vsHuman) {
        activePlayer = usernameX;
    } else {
        if (shouldPlayerStartAgainstIA === "true") {
            activePlayer = usernameX;
        } else {
            activePlayer = usernameO;
        }
    }
}

/**
 * Initialise si la partie se joue contre un humain ou une IA
 */
function initVsHuman() {
    vsHuman = shouldPlayerStartAgainstIA === null;
}

/**
 * Façon dont l'IA rempli les cases
 */
function playIA() {
    const emptyBoxIndexes = [];
    for (const [index, value] of boxStatus.entries()) {
        if (value === "") {
            emptyBoxIndexes.push(index);
        }
    }
    const randomEmptyBoxIndex = emptyBoxIndexes[Math.floor(Math.random() * emptyBoxIndexes.length)];
    handleBox(randomEmptyBoxIndex);
}

/**
 * Initialisation des paramètres du jeu
 */
function init() {
    saveUrlParams();
    initVsHuman();
    initActivePlayer();
    initPlayerColors();
    setPlayerTurnLabel();
    handleFirstPlayAI();
}

/**
 * Le joueur joue contre l'IA et l'IA commence
 */
function handleFirstPlayAI() {
    if (!vsHuman && shouldPlayerStartAgainstIA === "false") {
        handleIATurn();
    }
    canClick = true;
}

/**
 * Gère l'affichage des cases
 * @param cellIndex
 */
function handleBox(cellIndex) {
    if (boxStatus[cellIndex] !== "" || !activeGame) {
        return
    }
    const cell = document.getElementById(`box${cellIndex}`);
    const cellValue = activePlayer === usernameX ? 'X' : 'O';
    boxStatus[cellIndex] = cellValue;
    cell.innerHTML = cellValue;
    cell.style.color = activePlayer === usernameX ? xColor : oColor;
}

/**
 * Conditions pour gagner
 * @returns {boolean}
 */
function hasWinner() {
    let hasWinner = false;
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
            hasWinner = true;
            break
        }
    }
    return hasWinner;
}

function isGameOver(hasWinner) {
    const noCellAvailable = !boxStatus.includes("");
    return hasWinner || noCellAvailable;
}

/**
 * Vérifie le statut de la case et permet un click en fonction. A la fin appel une fonction pour vérifier s'il y a un gagnant ou une égalité
 * @param cell
 */
function onBoxClicked(cell) {
    if (canClick) {
        //récupère l'index de la case cliquée
        const cellId = cell.getAttribute("id");
        const cellIndex = parseInt(cellId.substr(3, 1));
        handleBox(cellIndex);
        handleTurn();
    }
}

/**
 * Gère le changement de tour
 * @param canAIPlay
 */
function handleTurn(canAIPlay = true) {
    const winner = hasWinner();
    const gameOver = isGameOver(winner);
    if (gameOver) {
        handleGameOver(winner);
    } else {
        switchPlayer();
        if (!vsHuman && canAIPlay) {
            canClick = false
            setTimeout(() => {
                handleIATurn();
                canClick = true;
            }, 1000);
        }
    }
}

/**
 * Gère le tour de l'IA
 */
function handleIATurn() {
    playIA();
    handleTurn(false);
}

/**
 * Gestion du changement de joueur
 */
function switchPlayer() {
    activePlayer = activePlayer === usernameX ? usernameO : usernameX;
    setPlayerTurnLabel();
}

/**
 * Gère la fin de la partie
 * @param hasWinner
 */
function handleGameOver(hasWinner) {
    activeGame = false;
    if (!hasWinner) {
        status.innerHTML = "Égalité !"
    } else {
        status.innerHTML = `${activePlayer} gagne !`;
        status.classList.add('win-animation');
        if (!vsHuman && activePlayer === "X") {
            status.innerHTML = `Vous avez gagné!`;
        }
        if (!vsHuman &&activePlayer ==="Pifomètre"){
            status.innerHTML = `Vous avez perdu =(`;
        }
    }

}

/**
 * Recommence le jeu et réinitilisation des valeurs
 */
function startAgain() {
    activeGame = true;
    boxStatus = ["", "", "", "", "", "", "", "", ""];
    document.querySelectorAll(".box").forEach(cell => cell.innerHTML = "");
    status.classList.remove('win-animation');
    init();
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

handleDom();
init();
