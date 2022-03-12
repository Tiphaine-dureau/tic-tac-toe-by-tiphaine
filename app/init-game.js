function redirectToGame(usernameX, usernameO, colorX, colorO, playerStart) {
    let newHref = `board-game.html?usernameX=${usernameX}&usernameO=${usernameO}&colorListX=${colorX}&colorListO=${colorO}`;
    if (playerStart !== undefined) {
        newHref = `${newHref}&playerStart=${playerStart}`;
    }
    window.location.href = newHref;
}